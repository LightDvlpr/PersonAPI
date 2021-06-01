jest.useFakeTimers()
const router = require("../routes/personRoutes").default;
const app = require("../app").default;
const supertest = require("supertest");
const request = supertest(app);
app.use(router)

var create = (request) => {
  return describe("Create person", () => {
    it("creates a new person object",  () => {
       request.post("").send({
          firstName: "Alex",
          middleName: "smith",
          lastName: "Frank",
          email: "1gmail.com",
          age: 19,
        })
        .expect(201)
        .then((response) => {
          console.log('response')
          expect("data" in response.body).toBe(true);
        });
    });
  });
};

var readAllPerson = (request) => {
  return describe("Read All Persons", () => {
    it("read all objects",  () => {
       request
        .get("")
        .expect(201)
        .then((response) => {
          expect("data" in response.body).toBe(true);
        });
    });
  });
};


var readsPerson = (request) => {
  return describe("Reads latest version of specific person", () => {
    it("Reads latest version of specific person",  () => {
      request.get("/148df625-a771-4c9e-a450-7811f4aa449f")
        .expect(201)
        .then((response) => {
          expect("data" in response.body).toBe(true);
        });
    });
  });
};


var readPersonVersion = (request) => {
  return describe("Reads person object with specified version", () => {
    it("Reads person object with specified version",  () => {
      request.get("/e31f009e-968c-4a7e-95b4-da55022b693f/2")
        .expect(201)
        .then((response) => {
          expect("data" in response.body).toBe(true);
        });
    });
  });
};

var updatePerson = (request) => {
  return describe("Update latest version of person object", () => {
    it("Update latest version of person object",  () => {
      request.put("/e31f009e-968c-4a7e-95b4-da55022b693f").send({
        firstName: "David",
        middleName: "",
        lastName: "Blane",
        email: "something@yahoo.com",
        age: 89,
      })
        .expect(201)
        .then((response) => {
          expect("data" in response.body).toBe(true);
        });
    });
  });
};

var deletePerson = (request) => {
  return describe("Update latest version of person object", () => {
    it("Update latest version of person object",  () => {
      request.delete("/d6b8e01d-b5c3-4596-8989-2619aed139ab")
        .expect(201)
        .then((response) => {
          expect("data" in response.body).toBe(true);
        });
    });
  });
};

create(request)
readAllPerson(request)
readsPerson(request)
readPersonVersion(request)
updatePerson(request)
deletePerson(request)