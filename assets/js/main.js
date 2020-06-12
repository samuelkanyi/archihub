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
        this.id= id;
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

class AddImages extends Section{
    constructor(){
        super("add-img")
    }

    loadElements(){}

    addListeners(){}
} 

class EditImages extends Section{
    constructor(){
        super("edit-img")
        
    }

    loadElements(section){
        this.images = section.querySelectorAll('.image');
        this.modalId = section.querySelector('#modal-id')
        this.modalCaption = section.querySelector('#modal-caption')
        this.modalCategory = section.querySelector('#modal-category')
        this.modalImage = section.querySelector('#modal-image')
        this.modalDelete = section.querySelector('.btn-delete')
        
    }

    addListeners(){
   
        this.images.forEach(image =>{
            let editBtn = image.querySelector('.btn-edit');
            let strId = image.getAttribute('id');
            let idArr = strId.split('-')
            editBtn.onclick = async()=>{
                let response =  await fetch(`${document.location.origin}/get/images/${parseInt(idArr[1])}`)
                let obj = await response.json();
                this.setModalproperties(obj)                

                $('#exampleModal').modal()
            }
        })
    }

    setModalproperties(obj){
        this.modalId.value = obj.id;
        this.modalCaption.innerText = obj.name;
        this.modalImage.src = `../../images/${obj.name}`;

        this.modalDelete.onclick=()=>{
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
                    }).then(response=>response.status)
                    .then(status=>{
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

class Company extends Section{
    constructor(){
        super("company")
    }

    loadElements(){}

    addListeners(){}
} 


class Users extends Section{
    constructor(){
        super("users")
    }

    loadElements(){}

    addListeners(){}
} 