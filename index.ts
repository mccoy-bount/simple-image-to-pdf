import * as fs from 'fs';
import {PDFDocument, PageSizes, PDFPage} from 'pdf-lib'
import sharp, {FormatEnum} from 'sharp';

//todo: 1.中英文档说明，
// 2。增加图片源的入参。 done
// 3提供logger。
// 4。提供图片的压缩功能，  done
// 5文档尺寸可设置，  done
// 6写用例   

type ImageSource = Buffer | string
type ImageSize = [number, number]

const Formats = {
  JPG: 'jpg',
  JPEG: 'jpeg',
  PNG: 'png',
  WebP: 'webp',
  GIF: 'gif',
  AVIF: 'avif',
  TIFF: 'tiff',
  SVG: 'svg',
  HEIC: 'heic'
}

enum compressEnum {
  FALSE,
  TRUE
}


/**
 * @description 计算图片的缩放和居中位置
 * @param pageWidth
 * @param pageHeight
 * @param imageWidth
 * @param imageHeight
 */
const calcImageLayout = ([pageWidth, pageHeight]: ImageSize, [imageWidth, imageHeight]: ImageSize) => {
  // 计算自适应缩放比例
  const scaleX = pageWidth / imageWidth;
  const scaleY = pageHeight / imageHeight;
  const scale = Math.min(scaleX, scaleY, 1);
  // 计算缩放后的图片尺寸
  const scaledWidth = imageWidth * scale;
  const scaledHeight = imageHeight * scale;
  // 计算居中位置
  const centerX = (pageWidth - scaledWidth) / 2;
  const centerY = (pageHeight - scaledHeight) / 2;
  return {
    x: centerX,
    y: centerY,
    width: scaledWidth,
    height: scaledHeight,
    scale: scale
  };
}
const genPDFPage = async ({imageSource, doc, settings}: {
  imageSource: ImageSource,
  doc: PDFDocument,
  settings: Settings
}) => {
  const sharper = sharp(imageSource)
  const {format, width, height} = await sharper.metadata()
  let page: PDFPage;
  if (settings.autoSize) {
    page = doc.addPage([width, height])
  } else {
    page = doc.addPage(settings.size)
  }

  // compress
  if (settings.compress) {
    if ([Formats.JPEG, Formats.JPG].includes(format)) {
      sharper.jpeg({quality: 80})
    } else {
      sharper.toFormat(Formats.JPG as (keyof FormatEnum), {quality: 80})
    }
  } else {
    if (![Formats.JPEG, Formats.JPG].includes(format)) {
      sharper.toFormat(Formats.JPG as (keyof FormatEnum))
    }
  }
  const image4 = await doc.embedJpg(await sharper.toBuffer())

  if (settings.autoSize) {
    page.drawImage(image4, {
      x: 0, y: 0, width, height
    })
  } else {
    const {x, y, width: imageWidth, height: imageHeight} = calcImageLayout(settings.size, [width, height])
    page.drawImage(image4, {
      x, y, width: imageWidth, height: imageHeight
    })
  }
}

interface Options {
  size?: ImageSize,
  compress?: compressEnum
}

interface Settings {
  autoSize: boolean,
  size: ImageSize,
  compress: boolean
}

const initSettings = (options: Options): Settings => {

  let autoSize = true, size: ImageSize = [0, 0]
  if (options.size) {
    autoSize = false
    size = options.size
  }
  const compress = options.compress === compressEnum.TRUE
  return {
    autoSize,
    size,
    compress,
  }
}

const imageToPDF = async (pages: ImageSource[] = [], options?: Options) => {
  const settings: Settings = initSettings(options || {})
  let doc: PDFDocument = await PDFDocument.create()
  for (let index = 0; index < pages.length; index++) {
    await genPDFPage({
      imageSource: pages[index],
      doc,
      settings
    })
  }
  return await doc.save()
};


export default imageToPDF
export {imageToPDF as convert, PageSizes, Formats}
