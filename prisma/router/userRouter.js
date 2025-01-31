const userRouter = require('express').Router();

const bcrypt = require("bcrypt");

const hashPasswordExtension = require('../../services/extensions/hashPasswordExtension');

const authguard = require('../../services/authguard');

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient().$extends(hashPasswordExtension)

userRouter.get('/register', (req, res) => {
    // Chemin à partir du dossier views
    res.render('pages/register.html.twig')
});

userRouter.get('/logout', (req,res) => {
    req.session.destroy();
    res.redirect('/login');
})

userRouter.post('/register', async (req, res) => {
    try {
        const { socialreason, lastName, siret, email, password, confirmPassword } = req.body;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
            throw ({ email: "L'adresse e-mail est invalide" });
        }

        if (password !== confirmPassword) {
            throw ({ confirmPassword: "Les mots de passe ne correspondent pas" });
        }

        const user = await prisma.user.create({
            data: {
                socialreason,
                lastName,
                siret,
                email,
                password
            }
        });

        res.redirect('/login');
    } catch (error) {
        if (error.code === "P2002") {
            error = { email: "Cette adresse mail est déjà utilisée" };
        }
        console.log(error);

        res.render('pages/register.html.twig', { title: "Inscription", error });
    }
});


userRouter.get('/login', (req, res) => {
    res.render('pages/login.html.twig', { title: "connexion" });
})

userRouter.post('/login', async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                siret: req.body.siret
            }
        })
        if (user) {
            if (await bcrypt.compare(req.body.password, user.password)) {
                req.session.user = user;
                res.redirect('/')
            }
            else throw ({password: "Mot de passe incorrect"});
        }
        else throw ({siret: "siret incorrect"});

    } catch (error) {
        res.render('pages/login.html.twig', { title: "connexion", error });
    }
})


// userRouter.get("/",authguard , async (req, res) => {
//     const user = await prisma.user.findUnique({
//         where: {
//             id: req.session.user.id
//         },
//         include: {
//             ordinateurs: true
//         }
//     });
    
//     res.render('pages/index.html.twig', {title: "acceuil", user: req.session.user, ordinateurs:user.ordinateurs});
// })



module.exports = userRouter

