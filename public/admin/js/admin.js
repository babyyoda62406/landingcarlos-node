let dataCache2 = ''

window.onload = () => {
    const msgShow = document.getElementById("msgShow")
    msgShow.onclick = handlerClick
    $(".toast").toast({ autohide: false })
}



const getMsg = () => {
    let tbBody = ``
    fetch('/admin/getMsg')
        .then(res => res.json())
        .then(data => {
            data.map(arg => {
                const { id, name, phone, email, message } = arg
                tbBody += `<tr>
                                <td scope="row" class="">${name}</td>
                                <td scope="row" class="">${phone}</td>
                                <td scope="row" class="">${email}</td>
                                <td scope="row" class="">${(message.length > 10) ? message.substring(0, 10) : message}...</td>
                                <td scope="row" class="btCtn">
                                    <button class="bttb btViewMsg ${id} btn btn-success" title="Toque para ver más">Leer</button>
                                    <button class="bttb btDeleteMsg ${id} btn btn-danger" title="Borrar mensaje">Borrar</button>
                                </td>
                            </tr>`
            })
            loadMSG(tbBody)
            dataCache2 = data
            $("#modalNotePad").modal("show")
        })

}


const loadMSG = (tbmsgBody) => {
    const tbScreen = document.getElementById("tbScreen")
    tbScreen.innerHTML = tbmsgHead
    tbScreen.innerHTML += tbmsgBody
    tbScreen.innerHTML += tbmsgFoot
    btPool = tbScreen.getElementsByClassName("bttb")
    for (let i = 0; i < btPool.length; i++) {
        btPool[i].onclick = handlerClick
    }
}

const tbmsgHead = `<thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>email</th>
                        <th>Mensaje</th>
                        <th>Opciones</th>
                    </tr>
                    </thead>
                    <tbody>`
const tbmsgFoot = `</tbody>`






const handlerClick = (arg) => {
    arg.preventDefault()
    arg.stopPropagation()
    const item = arg.target
    switch (item.id) {
        case "msgShow":
            getMsg()
            $("#modalNotePad").modal("show")
            break
    }
    switch (item.classList[1]) {
        case "btViewMsg":
            let trash_view = dataCache2.filter(arg => arg.id == item.classList[2])[0]
            document.getElementById("toastTitle").innerHTML = `${(trash_view.name.length>9)?trash_view.name.substring(0,9):trash_view.name}`
            document.getElementById("labelDate").innerHTML = `${trash_view.phone}`
            document.getElementById("toastBody").innerHTML = trash_view.message
            $(".toast").toast('show')
            break
        case "btDeleteMsg":
            const bdDelete = {"id":item.classList[2]}
            fetch("/admin/deleteMsg", {
                method: "post",
                body: JSON.stringify(bdDelete),
                headers: {
                    "Content-Type": "application/JSON"
                }
            })
                .then(res => res.json())
                .then(data => {
                    getMsg()
                })
            break
    }

}