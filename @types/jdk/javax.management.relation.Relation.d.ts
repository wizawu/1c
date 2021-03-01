declare namespace javax {
  namespace management {
    namespace relation {

      interface Relation {

        getRole(arg0: java.lang.String): java.util.List<javax.management.ObjectName>
        getRoles(arg0: java.lang.String[]): javax.management.relation.RoleResult
        getRoleCardinality(arg0: java.lang.String): java.lang.Integer
        getAllRoles(): javax.management.relation.RoleResult
        retrieveAllRoles(): javax.management.relation.RoleList
        setRole(arg0: javax.management.relation.Role): void
        setRoles(arg0: javax.management.relation.RoleList): javax.management.relation.RoleResult
        handleMBeanUnregistration(arg0: javax.management.ObjectName, arg1: java.lang.String): void
        getReferencedMBeans(): java.util.Map<javax.management.ObjectName,java.util.List<java.lang.String>>
        getRelationTypeName(): java.lang.String
        getRelationServiceName(): javax.management.ObjectName
        getRelationId(): java.lang.String
      }

    }
  }
}