declare namespace com {
  namespace sun {
    namespace jdi {
      namespace request {

        interface StepRequest extends com.sun.jdi.request.EventRequest {
          public static readonly STEP_INTO: int
          public static readonly STEP_OVER: int
          public static readonly STEP_OUT: int
          public static readonly STEP_MIN: int
          public static readonly STEP_LINE: int
          thread(): com.sun.jdi.ThreadReference
          size(): number
          depth(): number
          addClassFilter(arg0: com.sun.jdi.ReferenceType): void
          addClassFilter(arg0: java.lang.String | string): void
          addClassExclusionFilter(arg0: java.lang.String | string): void
          addInstanceFilter(arg0: com.sun.jdi.ObjectReference): void
        }

      }
    }
  }
}
