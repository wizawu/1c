declare namespace java {
  namespace awt {
    namespace image {

      class CropImageFilter extends java.awt.image.ImageFilter {
        cropX: int
        cropY: int
        cropW: int
        cropH: int
        public constructor(arg0: number | java.lang.Integer, arg1: number | java.lang.Integer, arg2: number | java.lang.Integer, arg3: number | java.lang.Integer)
        public setProperties(arg0: java.util.Hashtable<unknown,unknown>): void
        public setDimensions(arg0: number | java.lang.Integer, arg1: number | java.lang.Integer): void
        public setPixels(arg0: number | java.lang.Integer, arg1: number | java.lang.Integer, arg2: number | java.lang.Integer, arg3: number | java.lang.Integer, arg4: java.awt.image.ColorModel, arg5: number[] | java.lang.Byte[], arg6: number | java.lang.Integer, arg7: number | java.lang.Integer): void
        public setPixels(arg0: number | java.lang.Integer, arg1: number | java.lang.Integer, arg2: number | java.lang.Integer, arg3: number | java.lang.Integer, arg4: java.awt.image.ColorModel, arg5: number[] | java.lang.Integer[], arg6: number | java.lang.Integer, arg7: number | java.lang.Integer): void
      }

    }
  }
}
