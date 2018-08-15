# Testing GraphQL

- `npm install`
- `npm start`
- Now open http://localhost:4000/graphql in your browser.
- Insert the following query to the textarea on the left, press run and behold:

```
{
  profiles {
    id
    ... on Persona {
      homes
    }
    ... on HomeNode {
      endpoints {
        network
        address
      }
    }
  }
}
```

- Running this query provides a good overview of the introspection (reflection) capabilities and limitations of GraphQL:

```
query Reflection {
  __schema {
    queryType {
      fields {
        name
        ...fieldDetails
      }
    }
  }
}

fragment fieldDetails on __Field {
  type {
    ...typeDetails
    ofType {
      ...typeDetails
      ofType {
        ...typeDetails
        ofType {
          ...typeDetails
          ofType {
            ...typeDetails
          }
        }
      }
    }
  }
}

fragment fieldDetails2 on __Field {
  type {
    ...typeDetails2
    ofType {
      ...typeDetails2
      ofType {
        ...typeDetails2
        ofType {
          ...typeDetails2
          ofType {
            ...typeDetails2
          }
        }
      }
    }
  }
}

fragment typeDetails2 on __Type {
  name
  kind
  possibleTypes {
    name
  }
  fields {
    name
  }
}

fragment typeDetails on __Type {
  name
  kind
  possibleTypes {
    name
    ...typeDetails2
  }
  fields {
    name
    ...fieldDetails2
  }
}
```

- If you want better introspection, you need to do it client-side, like how it is done if you click on the `Docs` buton in the top right corner. That documentation is created from similar schema queries we did, but on client-side.