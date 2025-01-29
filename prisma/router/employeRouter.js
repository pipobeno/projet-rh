const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authguard = require('../../services/authguard');
const employeRouter = require('express').Router();

employeRouter.get("/", authguard, async (req, res) => {
    try {
        const employes = await prisma.employe.findMany({
            where: {
                userId: req.session.user.id
            }
        });

        res.render("pages/index.html.twig", { employes: employes, user: req.session.user });
    } catch (error) {
        console.error(error);
        res.render("pages/index.html.twig", { error: error.message });
    }
});

employeRouter.post("/addEmploye/:id", authguard, async (req, res) => {
    try {
        const { nom, prenom, email, password, age, genre } = req.body;
        const { id } = req.params;

      
        const employe = await prisma.employe.create({
            data: {
                nom,
                prenom,
                email,
                password,
                age:parseInt(age),
                genre,
                userid: req.session.user.id,
                
            }
        });

        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.render("pages/index.html.twig", { error: error.message });
    }
});

module.exports = employeRouter;
