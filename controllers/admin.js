const { response , request} = require("express")
const path = require("path")
const { readData, saveData } = require("../helpers/db_handler")
const sendBack = (req=request, res = response)=>{
    res.redirect("/admin")
}

const getMsg = (req=request, res = response) => {
    pathDB  = path.join(__dirname, '../db/msg.json' )
    let tempDB  = readData(pathDB) 
    res.status(200).json(tempDB)
}

const deleteMsg  = (req=request, res = response) => {
    const {id}   = req.body
    pathDB       = path.join(__dirname, '../db/msg.json' )
    let tempDB   = readData(pathDB)
    tempDB       = tempDB.filter(arg => arg.id != id)
    saveData(tempDB , pathDB )
    res.status(200).json({"msg":"success"})
}


const submit = (req=request, res = response)=>{
    const {usuario, contrasenia} = req.body
    pathDB  = path.join(__dirname, '../db/user.json' )
    let tempDBUser  = readData(pathDB)
    let validate = false  
    tempDBUser.map(arg => {
        if(arg.user == usuario && arg.key == contrasenia)validate = true 
    })

    if(validate){
        res.writeHead(200 , {
            'Content-type':'text/html'
        })
        res.end(privateAdmin)
    }else{
        const pathBack = path.join(__dirname , "../public/admin/index.html")
        res.redirect("/admin")
        res.end()
    }

    res.end()
}



const privateAdmin = `<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Portafolio</title>
        <!-- Favicon-->
        <link rel="icon" type="image/x-icon" href="../assets/favicon.ico" />
        <!-- Font Awesome icons (free version)-->
        <script src="../js/all.js" crossorigin="anonymous"></script>
        <!-- Google fonts
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css" />
        <link href="https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic" rel="stylesheet" type="text/css" />
        Core theme CSS (includes Bootstrap)-->
        <script src="js/admin.js"></script>
        <link href="../css/styles.css" rel="stylesheet" />
    </head>
    <body id="page-top">
        <!-- Navigation-->
        <nav class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
            <div class="container">
                <a class="navbar-brand" href="#page-top">Carlos López Herrera</a>
                <button class="navbar-toggler text-uppercase font-weight-bold bg-primary text-white rounded" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i class="fas fa-bars"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3 rounded" id="btGoToSite" href="/">Ir al sitio</a></li>
                        <li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3 rounded" id="msgShow" href="#">Gestionar mensajes</a></li>
                        <li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3 rounded" id="btExit"  href="/admin">Salir</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <!-- Masthead-->
        <header class="masthead bg-primary text-white text-center">
            <div class="container d-flex align-items-center flex-column">
                <!-- Masthead Avatar Image-->
                <img class="masthead-avatar mb-5 img-fluid rounded-circle" src="../assets/img/person.jpg" alt="..." />
                <!-- Masthead Heading-->
                <h1 class="masthead-heading text-uppercase mb-0">Carlos López Herrera</h1>
                <!-- Icon Divider-->
                <div class="divider-custom divider-light">
                    <div class="divider-custom-line"></div>
                    <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                    <div class="divider-custom-line"></div>
                </div>
                <!-- Masthead Subheading-->
                <p class="masthead-subheading font-weight-light mb-0">Dise&ntilde;ador de logos - Sprite Manager - Master en CSS  </p>
            </div>
        </header>
        
        <!-- Footer-->
        <footer class="footer text-center">
            <div class="container">
                <div class="row">
                    <!-- Footer Location-->
                    <div class="col-lg-4 mb-5 mb-lg-0">
                        <h4 class="text-uppercase mb-4">Localización</h4>
                        <p class="lead mb-0">
                            Habana, Cuba
                            <br />
                            Playa, NO 75B /E  74 y 76
                        </p>
                    </div>
                    <!-- Footer Social Icons-->
                    <div class="col-lg-4 mb-5 mb-lg-0">
                        <h4 class="text-uppercase mb-4">Administar mis redes</h4>
                        <a class="btn btn-outline-light btn-social mx-1" href="#!"><i class="fab fa-fw fa-facebook-f"></i></a>
                        <a class="btn btn-outline-light btn-social mx-1" href="#!"><i class="fab fa-fw fa-twitter"></i></a>
                        <a class="btn btn-outline-light btn-social mx-1" href="#!"><i class="fab fa-fw fa-linkedin-in"></i></a>
                        <a class="btn btn-outline-light btn-social mx-1" href="#!"><i class="fab fa-fw fa-dribbble"></i></a>
                    </div>
                    <!-- Footer About Text-->
                    <div class="col-lg-4">
                        <h4 class="text-uppercase mb-4">Reportar un problema</h4>
                        <p class="lead mb-0">
                             
                            <a href="mailto:babyyoda62406@gmail.com">Contacto del creador</a>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </footer>

        <div class="modal fade" id="modalNotePad" tabindex="-1" aria-labelledby="modalNotePad" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="mb-0" id="tbTitle">Mensajes</h3>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body d-flex flex-column justify-content-center table-responsive">
                    <table class="table" id="tbScreen">
                       
                    </table>
                </div>

                <div class="modal-footer"></div>

            </div>

        </div>
    </div>


        <!-- Copyright Section-->
        <div class="copyright py-4 text-center text-white">
            <div class="container"><small>Copyright &copy; DTM_Frelance 2022</small></div>
        </div>
        <!-- Bootstrap core JS-->
        <script src="js/jquery.min.js"></script>
        <script src="../js/bootstrap.bundle.min.js"></script>
        <script src="js/custom.js"></script>
        <!-- Core theme JS-->
        <!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *-->
        <!-- * *                               SB Forms JS                               * *-->
        <!-- * * Activate your form at https://startbootstrap.com/solution/contact-forms * *-->
        <!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *-->
        
        <div class="toast">
        <div class="toast-header d-flex">
            <div class="rounder " style="height: 16px;width: 16px;background-color: antiquewhite ;"></div>
            <strong id="toastTitle" class="mr-auto">Título de la notificación</strong>
            <small id="labelDate">03:03:2002</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body " id="toastBody">
            Texto , aqui va el mensaje
        </div>
    </div>

    </body>
</html>
`
module.exports = {
    sendBack, submit, getMsg, deleteMsg
}