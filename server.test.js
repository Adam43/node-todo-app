import request from "supertest";
import createServer from "./server.js";

const server = await createServer();

//GET | Should be an unauthorized route
describe("Just testing the server", function () {
  describe("Testing the /todo route", function () {
    it("Should be unable to get todos without flag", function (done) {
      request(server)
        .get("/todo")
        .expect(401)
        .end(function (err) {
          if (err) {
            throw err;
          } else {
            done();
          }
        });
    });

//GET    
    it("Should get back a 200 from /todo list", (done) => {
      request(server)
        .get("/todo?admin=true")
        .expect(200)
        .end(function (err, response) {
          if (err) {
            throw err;
          } else {
            // console.log(response.body.data.)
            done();
          }
        });
    });

//GET | An specific identifier is added 
    it("should be able to get a todo", function(done){
      request(server)
        .get("/todo/49-a?admin=true")
        .expect(200)
        .end(function(err, response){
          if(err){
              throw err;
          }else{
              done();
          }
      });
  });

//POST
    it("/POST It should add a new todo", (done) => {
        request(server)
          .post("/todo?admin=true")
          .send({
            todo: "Clean my Netlfix queue",
          })
          .set("Accept", "application/json")
          .expect(200)
          .end(function (err, response) {
            if (err) {
              throw err;
            } else {
              console.log(response);
              expect(response.body).toEqual({ success: true });
              done();
            }
          });
      });
    
    
//PUT
      it("/PUT It should edit an item on my todo list", (done) => {
        request(server)
            .put("/todo/lCKJ?admin=true")
            .send({
                todo: "Clean my fridge",
            })
            .expect(200)
            .end(function (err, response) {
                if(err) {
                    throw err;
                } else {
                  console.log(response.body);
                  expect(response.body).toEqual({ success: true })
                  done(); 
                }
            });
        });
  

 
//DELETE
        it("/DELETE It should delete an item on my todo list", (done) => {
            request(server)
                .delete("/todo/tEpZ?admin=true")
                .expect(200)
                .end(done);
                    
        });
    });
});

