const router = require("../routes/personRoutes").default;
const app = require("../app").default;
const supertest = require("supertest");
const request = supertest(app);
app.use(router);

var create = (request) => {
  return describe("agencyAccessList API Endpoint", () => {
    it("creates a new person object", async () => {
      await request
        .post("")
        .send({
          firstName: "Alex",
          middleName: "smith",
          lastName: "Frank",
          email: "1gmail.com",
          age: 19,
        })
        .expect(201)
        .then((response) => {
          expect("data" in response.body).toBe(true);
        });
    });
  });
};

create(request)
 
test("Reads all persons in database", () => {
  expect(request.get("")).toBe("");
  done();
});

test("Reads latest version of specific person", () => {
  expect(request.get("/148df625-a771-4c9e-a450-7811f4aa449f")).toBe("");
  done();
});

test("Reads person object with specified version", () => {
  expect(request.get("/e31f009e-968c-4a7e-95b4-da55022b693f/2")).toBe("");
  done();
});

test("Update latest version of person object", () => {
  expect(
    request.put("/e31f009e-968c-4a7e-95b4-da55022b693f").send({
      firstName: "David",
      middleName: "",
      lastName: "Blane",
      email: "something@yahoo.com",
      age: 89,
    })
  ).toBe("");
  done();
});

test("Deletes latest version of person object", () => {
  expect(request.delete("/d6b8e01d-b5c3-4596-8989-2619aed139ab")).toBe("");
  done();
});