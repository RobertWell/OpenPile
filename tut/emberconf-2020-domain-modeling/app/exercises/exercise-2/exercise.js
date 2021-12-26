// Exercise 2: CRUD
import { Server, RestSerializer, Model } from "miragejs";

export default function makeServer() {
  return new Server({
    serializers: { application: RestSerializer },
    models:{
        user:Model
    }, 
    seeds(server){
      server.create('user', {name:"Sam"})
      server.create('user', {name:"Ryan"})
    },


    routes() {

      this.resource('user')
      // this.get("/users", (schema, request) => {
      //   return schema.users.all();
      // });

      // this.get("/users/:id", (schema, request) => {
      //   return schema.users.find(request.params.id);
      // });

      // this.post("/users", function(schema, request) {
      //   return schema.users.create(this.normalizedRequestAttrs());
      // });

      // this.patch("/users/:id", function(schema, request) {
      //   let user = schema.users.find(request.params.id);

      //   return user.update(this.normalizedRequestAttrs());
      // });

      // this.delete("/users/:id", function(schema, request) {
      //   schema.users.find(request.params.id).destroy();
      // });
    }
  });
}
