const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authguard = require('../../services/authguard');
const ordinateurRouter = require('express').Router();

ordinateurRouter.get("/", authguard, async (req, res) => {
    try {
        const ordinateurs = await prisma.ordinateur.findMany({
            where: {
                userId: req.session.user.id
            }
        });
        res.render("pages/index.html.twig", { ordinateurs: ordinateurs, user: req.session.user });
    } catch (error) {
        console.error(error);
        res.render("pages/index.html.twig", { error: error.message });
    }
});


ordinateurRouter.post("/addOrdinateur", authguard, async (req, res) => {
    try {
        const { adressMac } = req.body;

        const ordinateur = await prisma.ordinateur.create({
            data: {
                adressMac, 
                userId: req.session.user.id
            }
        });
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.render("pages/index.html.twig", { error: error.message });
    }
});

ordinateurRouter.get("/deleteOrdinateur/:id", authguard, async (req, res) => {
    try {
        await prisma.ordinateur.delete({
            where: {
                id: parseInt(req.params.id),
                userId: req.session.user.id
            }
        });
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.render("pages/index.html.twig", { error: error.message });
    }
});

module.exports = ordinateurRouter;
