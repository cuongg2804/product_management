const express = require("express") ;
const router = express.Router() ;

const Role = require("../../controller/admin/role.controller");

router.get("/", Role.index);

// GET /admin/roles/create

router.get("/create", Role.create);

// GET /admin/roles/create

router.post("/create", Role.createPost);

// GET /admin/roles/edit/:id

router.get("/edit/:id", Role.edit);

// PATCH /admin/roles/edit/:id

router.patch("/edit/:id", Role.editPatch);

// GET /admin/role/permission

router.get("/permission", Role.permission);

// PATCH /admin/roles/permissions

router.patch("/permissions", Role.permissionPatch);

module.exports = router ;