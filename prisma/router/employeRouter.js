const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authguard = require('../../services/authguard');
const employeRouter = require('express').Router();

employeRouter.get("/", authguard, async (req, res) => {
    try {
        const ordinateurs = await prisma.ordinateur.findMany({
            where: {
                userId: req.session.user.id
            }
        });
        const employes = await prisma.employe.findMany({
            where: {
                userid: req.session.user.id
            }
        });
        res.render("pages/index.html.twig", { ordinateurs: ordinateurs, user: req.session.user, employes: employes });
    } catch (error) {
        console.error(error);
        res.render("pages/index.html.twig", { error: error.message });
    }
});


employeRouter.post("/addEmploye/:ordinateurId", authguard, async (req, res) => {
    try {
        const { nom, prenom, email, password, age, genre } = req.body;
        const ordinateurId = parseInt(req.params.ordinateurId);

        const newEmploye = await prisma.employe.create({
            data: {
                nom,
                prenom,
                email,
                password,
                age: age ? parseInt(age) : null,
                genre,
                ordinateur: {
                    connect: {id: ordinateurId}
                },
                userid: req.session.user.id
            }
        });

        res.redirect(`/ordinateur/${ordinateurId}`);
    } catch (error) {
        console.log(error);
        
        res.status(500).send("Erreur lors de l'ajout de l'employé.");
    }
});


employeRouter.get("/deleteEmploye/:id", authguard, async (req, res) => {
    try {
        await prisma.employe.delete({
            where: {
                id: parseInt(req.params.id),
                userid: req.session.user.id
            }
        });
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.render("pages/index.html.twig", { error: error.message });
    }
});



employeRouter.get("/editEmploye/:id", authguard, async (req, res) => {
    try {
        const employe = await prisma.employe.findFirst({
            where: {
                id: parseInt(req.params.id),
                userid: req.session.user.id
            },
            include: {
                ordinateur: true
            }
        });

        if (!employe) {
            return res.redirect("/?error=Employé introuvable");
        }

        const employes = await prisma.employe.findMany({
            where: {
                userid: req.session.user.id
            }
        });

        res.render("pages/ordinateur.html.twig", {
            employe,
            title: "Modifier Employé",
            user: req.session.user,
            employes
        });
    } catch (error) {
        console.error(error);
        res.render("pages/index.html.twig", { error: "Erreur lors du chargement de l'employé." });
    }
});


employeRouter.post("/editEmploye/:id", authguard, async (req, res) => {
    try {
        const { nom, prenom, age, genre } = req.body;

        if (!nom.match(/^[a-zA-Z0-9]+$/) || !prenom.match(/^[a-zA-Z0-9]+$/)) {
            throw new Error("Le nom et le prénom ne peuvent contenir que des lettres et des chiffres.");
        }

        const employe = await prisma.employe.update({
            where: {
                id: parseInt(req.params.id),
                userid: req.session.user.id
            },
            data: {
                nom,
                prenom,
                age: age ? parseInt(age) : null,
                genre
            }
        });

        res.redirect('/ordinateur/' + req.body.ordinateur)
    } catch (error) {
        console.error(error);

        res.render("pages/ordinateur.html.twig", {
            user: req.session.user,
            error: error.message,
            employes: await prisma.employe.findMany({
                where: {
                    userid: req.session.user.id
                }
            }),
            employe: await prisma.employe.findFirst({
                where: {
                    id: parseInt(req.params.id),
                    userid: req.session.user.id
                }
            })
        });
    }
});


employeRouter.get("/ordinateur/:id", authguard, async (req, res) => {
    try {
        const ordinateurId = parseInt(req.params.id);
        const ordinateur = await prisma.ordinateur.findUnique({
            where: { id: ordinateurId }
        });
        const employes = await prisma.employe.findFirst({
            where: {
                ordinateur: {
                    is:{
                        id:ordinateurId
                    }
                }
            }
        });
        res.render("pages/ordinateur.html.twig", {
            ordinateur,
            employes,
            user: req.session.user
        });
    } catch (error) {
        console.error(error);
        res.render("pages/ordinateur.html.twig", { error: error.message });
    }
});


module.exports = employeRouter;
