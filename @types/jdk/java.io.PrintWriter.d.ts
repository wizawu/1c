declare namespace java {
  namespace io {

    class PrintWriter extends java.io.Writer {

      protected out: java.io.Writer
      public constructor(arg0: java.io.Writer)
      public constructor(arg0: java.io.Writer, arg1: boolean)
      public constructor(arg0: java.io.OutputStream)
      public constructor(arg0: java.io.OutputStream, arg1: boolean)
      public constructor(arg0: java.io.OutputStream, arg1: boolean, arg2: java.nio.charset.Charset)
      public constructor(arg0: java.lang.String)
      public constructor(arg0: java.lang.String, arg1: java.lang.String)
      public constructor(arg0: java.lang.String, arg1: java.nio.charset.Charset)
      public constructor(arg0: java.io.File)
      public constructor(arg0: java.io.File, arg1: java.lang.String)
      public constructor(arg0: java.io.File, arg1: java.nio.charset.Charset)
      public flush(): void
      public close(): void
      public checkError(): boolean
      protected setError(): void
      protected clearError(): void
      public write(arg0: int): void
      public write(arg0: char[], arg1: int, arg2: int): void
      public write(arg0: char[]): void
      public write(arg0: java.lang.String, arg1: int, arg2: int): void
      public write(arg0: java.lang.String): void
      public print(arg0: boolean): void
      public print(arg0: char): void
      public print(arg0: int): void
      public print(arg0: long): void
      public print(arg0: float): void
      public print(arg0: double): void
      public print(arg0: char[]): void
      public print(arg0: java.lang.String): void
      public print(arg0: java.lang.Object): void
      public println(): void
      public println(arg0: boolean): void
      public println(arg0: char): void
      public println(arg0: int): void
      public println(arg0: long): void
      public println(arg0: float): void
      public println(arg0: double): void
      public println(arg0: char[]): void
      public println(arg0: java.lang.String): void
      public println(arg0: java.lang.Object): void
      public printf(arg0: java.lang.String, ...arg1: java.lang.Object[]): java.io.PrintWriter
      public printf(arg0: java.util.Locale, arg1: java.lang.String, ...arg2: java.lang.Object[]): java.io.PrintWriter
      public format(arg0: java.lang.String, ...arg1: java.lang.Object[]): java.io.PrintWriter
      public format(arg0: java.util.Locale, arg1: java.lang.String, ...arg2: java.lang.Object[]): java.io.PrintWriter
      public append(arg0: java.lang.CharSequence): java.io.PrintWriter
      public append(arg0: java.lang.CharSequence, arg1: int, arg2: int): java.io.PrintWriter
      public append(arg0: char): java.io.PrintWriter
      public append(arg0: char): java.io.Writer
      public append(arg0: java.lang.CharSequence, arg1: int, arg2: int): java.io.Writer
      public append(arg0: java.lang.CharSequence): java.io.Writer
      public append(arg0: char): java.lang.Appendable
      public append(arg0: java.lang.CharSequence, arg1: int, arg2: int): java.lang.Appendable
      public append(arg0: java.lang.CharSequence): java.lang.Appendable
    }

  }
}