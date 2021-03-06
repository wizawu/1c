declare namespace org {
  namespace w3c {
    namespace dom {

      interface UserDataHandler$$lambda {
        (arg0: number | java.lang.Short, arg1: java.lang.String | string, arg2: java.lang.Object | any, arg3: org.w3c.dom.Node, arg4: org.w3c.dom.Node): void
      }

      interface UserDataHandler {
        public static readonly NODE_CLONED: short
        public static readonly NODE_IMPORTED: short
        public static readonly NODE_DELETED: short
        public static readonly NODE_RENAMED: short
        public static readonly NODE_ADOPTED: short
        handle(arg0: number | java.lang.Short, arg1: java.lang.String | string, arg2: java.lang.Object | any, arg3: org.w3c.dom.Node, arg4: org.w3c.dom.Node): void
      }

    }
  }
}
