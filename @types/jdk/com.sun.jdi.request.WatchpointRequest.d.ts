declare namespace com {
  namespace sun {
    namespace jdi {
      namespace request {

        interface WatchpointRequest extends com.sun.jdi.request.EventRequest {

          field(): com.sun.jdi.Field
          addThreadFilter(arg0: com.sun.jdi.ThreadReference): void
          addClassFilter(arg0: com.sun.jdi.ReferenceType): void
          addClassFilter(arg0: java.lang.String): void
          addClassExclusionFilter(arg0: java.lang.String): void
          addInstanceFilter(arg0: com.sun.jdi.ObjectReference): void
        }

      }
    }
  }
}