declare namespace java {
  namespace lang {
    namespace invoke {

      class MutableCallSite extends java.lang.invoke.CallSite {

        public constructor(arg0: java.lang.invoke.MethodType)
        public constructor(arg0: java.lang.invoke.MethodHandle)
        public readonly getTarget(): java.lang.invoke.MethodHandle
        public setTarget(arg0: java.lang.invoke.MethodHandle): void
        public readonly dynamicInvoker(): java.lang.invoke.MethodHandle
        public static syncAll(arg0: java.lang.invoke.MutableCallSite[]): void
      }

    }
  }
}