declare namespace com {
  namespace sun {
    namespace jdi {

      interface ByteValue extends com.sun.jdi.PrimitiveValue, java.lang.Comparable<com.sun.jdi.ByteValue> {
        value(): number
        equals(arg0: java.lang.Object | any): boolean
        hashCode(): number
      }

    }
  }
}
