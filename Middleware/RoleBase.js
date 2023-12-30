const RoleBase = (permittedRoles) => (req, res, next) => {
    const userRole = req.body.role;
    console.log("body here: ",req.body)
    console.log("User Role:", userRole);

    if (permittedRoles.includes(userRole)) {
        next();
    } else {
        res.status(403).send("You are not authorized for this route");
    }
};

module.exports = { RoleBase };
