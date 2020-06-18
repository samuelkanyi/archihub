/**
 * @classdesc create a class that handles my own exceptions.
 * Use the sweet alert library to display my exception to the user
 */
class UserException {
    /**
     * 
     * @param {string} message This will be message being shown by sweet alert
     */
    constructor(message) {
        this.message = message
        this.name = 'UserException'

        swal({
            title: "Exception!!",
            text: message,
            icon: "warning",
            dangerMode: true,
        })
    }

}

class Section {
    constructor(id) {
        this.id = id;
        //get the id of the section
        this.section = document.querySelector(`#${this.id}`)
        this.init();
        this.loadElements(this.section);
        this.addListeners();
    }

    init() {
        document.querySelector('section.active-section').classList.remove('active-section')
        document.querySelector(`#${this.id}`).classList.add('active-section')
    }

    loadElements() {
        // throw new UserException(`Must implement ${this.loadElements.name} in child classes`)
    }

    addListeners() {
        // throw new UserException(`Must implement ${this.addListeners.name} in child classes`)
    }

}

class AddFinish extends Section {
    constructor() {
        super("add-finish")
    }

    loadElements(section) {
        this.inputFile = section.querySelector('#upload-image');
        this.imgElem = section.querySelector('#img-finish')
        this.finishForm = section.querySelector('#finish-form')
    }

    addListeners() {
        this.inputFile.addEventListener('change', (e) => {
            const file = e.target.files[0];
            this.imgElem.file = file;
            const reader = new FileReader();
            reader.onload = (function (aImg) {
                return function (e) {
                    aImg.src = e.target.result;
                };
            })(this.imgElem);
            reader.readAsDataURL(file);

        })
    }
}

class AddProject extends Section{
    constructor(){
        super("add-project")
    }
    loadElements(section){
        this.addInputBtn = section.querySelector("#add-project-image");
        this.selectYear = section.querySelector("#year")
        this.section= section;
    }

    addListeners(){
        this.addInputBtn.addEventListener('click', (e)=>{
            const input = document.createElement('input');
            input.type= 'file'
            input.name = 'avatar'
            this.section.querySelector("#addInputParent").insertBefore(input, this.addInputBtn)
            e.preventDefault()
        })
    }
}
class EditImages extends Section {
    constructor() {
        super("edit-img")

    }

    loadElements(section) {
        this.images = section.querySelectorAll('.image');
        this.modalId = section.querySelector('#modal-id')
        this.modalCaption = section.querySelector('#modal-caption')
        this.modalCategory = section.querySelector('#modal-category')
        this.modalImage = section.querySelector('#modal-image')
        this.modalDelete = section.querySelector('.btn-delete')

    }

    addListeners() {

        this.images.forEach(image => {
            let editBtn = image.querySelector('.btn-edit');
            let strId = image.getAttribute('id');
            let idArr = strId.split('-')
            editBtn.onclick = async () => {
                let response = await fetch(`${document.location.origin}/get/images/${parseInt(idArr[1])}`)
                let obj = await response.json();
                this.setModalproperties(obj)

                $('#exampleModal').modal()
            }
        })
    }

    setModalproperties(obj) {
        this.modalId.value = obj.id;
        this.modalCaption.innerText = obj.name;
        this.modalImage.src = `../../images/${obj.name}`;

        this.modalDelete.onclick = () => {
            swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this image",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        fetch(`${document.location.origin}/admin/image/${obj.id}`, {
                                method: 'DELETE',
                            }).then(response => response.status)
                            .then(status => {
                                console.log(status);

                                swal("Poof! Your image file has been deleted!", {
                                    icon: "success",
                                });
                                location.reload()


                            })
                    } else {
                        swal("Your image file is safe!");
                    }
                });
        }
    }
}

class Company extends Section {
    constructor() {
        super("company")
    }

    loadElements(section) {
        this.editBtns = section.querySelectorAll('.warning')
        this.cancel = section.querySelectorAll('.cancel-form')

    }

    addListeners() {
        this.editBtns.forEach(btn=>{
            btn.addEventListener('click', ()=>{
               let parentNode = btn.parentNode.parentNode; 
                parentNode.querySelector('form').classList.add('shown')
               
            })
        })

        this.cancel.forEach(btn=>{
            btn.addEventListener('click', (e)=>{
                let parentNode = btn.parentNode.parentNode;
                parentNode.classList.remove('shown')
                e.preventDefault()
            })
        })
    }
}


class Users extends Section {
    constructor() {
        super("users")
    }

    loadElements() {}

    addListeners() {}
}