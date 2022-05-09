import { doc } from "prettier";
import { keyLayoutRu, keyLayoutEn, dictRuShiftFirstLine, dictEnShiftFirstLine } from './dictionary';

   class Keyboard {
      // elements
      main = null;
      keysContainer = null;
      keys = [];

      // properties
      value = '';
      capsLock = false;
      shift = false;

      eventHendlers = {
      
      oninput: null,
      // onclose: null,
   }
      // methods
      init() {
         // Create Main Elements
         this.main = document.createElement('div')
         this.title = document.createElement('h1')
         this.textarea = document.createElement('textarea');
         // textareaObject.autofocus = true;
         this.keysContainer = document.createElement('div')
         this.system = document.createElement('p')
         this.switchLang = document.createElement('p')
         let node = document.createTextNode("RSS Virtual Keyboard");
         let node1 = document.createTextNode("Клавиатура создана в операционной системе Windows. ");
         let node2 = document.createTextNode("Для переключения языка комбинация: левыe ctrl + alt");

         // Setup Main Elements
         this.main.classList.add('wrapper')
         this.title.append(node);
         this.textarea.classList.add('input')
         this.textarea.autofocus = true;
         this.textarea.addEventListener('blur', () => {
               this.textarea.focus();
            });
         this.keysContainer.classList.add('keyboard')
         this.system.classList.add('system')
         this.system.append(node1);
         this.switchLang.classList.add('switch_language')
         this.system.append(node2);
         this.keysContainer.append(this._createKeys());

         this.keys = this.keysContainer.querySelectorAll('key')  

         // Add To DOM
         this.main.append(this.title)
         this.main.append(this.textarea)
         this.main.append(this.keysContainer)
         this.main.append(this.system)
         this.main.append(this.switchLang)
         document.body.append(this.main)

          
         window.addEventListener('keydown', (e) => {
            e.preventDefault()
            document.querySelectorAll('.key').forEach(key => {
               if (obj[e.which] === key.textContent) {
                  key.classList.add('active')
               }
            })
            
         } )

         window.addEventListener('keyup', (e) => {
            e.preventDefault()
            document.querySelectorAll('.key').forEach(key => {
               if (obj[e.which] === key.textContent) {
                  key.classList.remove('active')
               }
            })
            
         } )

        }
      
      _createKeys() {
         const fragment = document.createDocumentFragment();
         const keyLayout = keyLayoutEn;
         let isFirst = true;

        keyLayout.forEach(key => {
           const keyElement = document.createElement('button');
         
            keyElement.setAttribute('type', 'button');
            keyElement.classList.add('key');

            switch (key) {
               case 'Backspace':
                  keyElement.classList.add('back');
                  keyElement.innerHTML = 'Backspace';

                  keyElement.addEventListener('click', () => {
                     this.value = this.value.substring(0, this.value.length - 1);
                     this._print();
                  })

                  break;

               case 'Del':
                  keyElement.textContent = 'Del';

                   
                  keyElement.addEventListener('click', () => {
                     this.value = this.value.substring(1, this.value.length);
                     this._print();
                  })
                  

                  break;

               case 'Caps':
                  keyElement.classList.add('xl');
                  keyElement.innerHTML = 'Caps';

                  keyElement.addEventListener('click', () => {
                     this._toggleCapsLock();
                 })

                  break;

               case 'Enter':
                  keyElement.classList.add('xxl');
                  keyElement.innerHTML = 'Enter';

                  keyElement.addEventListener('click', () => {
                     this.value += '\n';
                     this._print();
                  })

                  break;

               case 'Space':
                  keyElement.classList.add('space');
                  keyElement.textContent = 'Space';

                  keyElement.addEventListener('click', () => {
                     this.value += ' ';
                     this._print();
                  })

                  break;

               case 'Tab':
                  keyElement.classList.add('m');
                  keyElement.textContent = 'Tab';

                  keyElement.addEventListener('click', () => {
                     this.value += '    ';
                     this._print();
                  })

                  break;

               case 'Win':
                  keyElement.classList.add('l');
                  keyElement.textContent = 'Win';

                  break;

                  // NOT DONE
               case 'Ctrl':
                  keyElement.classList.add('l');
                  keyElement.textContent = 'Ctrl';
               
                  break;
                            

               case 'Alt':
                  keyElement.classList.add('l');
                  keyElement.textContent = 'Alt';

                  keyElement.addEventListener('click', () => {
                     // this.value += ' ';
                     // this._print();
                  })

                  break;

               case 'Shift':
                  if (isFirst) {
                     keyElement.classList.add('xl');
                     isFirst = !isFirst;
                  } else {
                     keyElement.classList.add('xxl');
                  }
                  
                  keyElement.textContent = 'Shift';
                 
                  keyElement.addEventListener('mousedown', () => {
                      this._toggleShift()                   
                  })

                  keyElement.addEventListener('mouseup', () => {
                      this._toggleShift()                   
                  })

                  break;

               
               default:
                  keyElement.classList.add('letter');
                  keyElement.textContent = key.toLowerCase()
                  
                  keyElement.addEventListener('click', (e) => {
                     this.value += e.target.textContent;
                     this._print();
                  })

                  break;
            }

            fragment.append(keyElement)

            
        })

        return fragment
      }

      _toggleShift() {
         this.shift = !this.shift;
         
            this.keysContainer.querySelectorAll('.letter').forEach(key => {
             key.textContent = this.shift ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
         })
         
      }
      
      _print() {
         document.querySelector('.input').value = this.value

      }

      _toggleCapsLock() {
         console.log("CapsLock Toggled!");

         this.capsLock = !this.capsLock;

         this.keysContainer.querySelectorAll('.letter').forEach(key => {
            key.textContent = this.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
         })
         
      }

    
   }




export { Keyboard };