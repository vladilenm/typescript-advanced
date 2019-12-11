// function Log(constructor: Function) {
//   console.log(constructor)
// }
//
// function Log2(target: any, propName: string | Symbol) {
//   console.log(target)
//   console.log(propName)
// }
//
// function Log3(target: any, propName: string | Symbol, descriptor: PropertyDescriptor) {
//   console.log(target)
//   console.log(propName)
//   console.log(descriptor)
// }

// interface ComponentDecorator {
//   selector: string
//   template: string
// }
//
// function Component(config: ComponentDecorator) {
//   return function
//     <T extends { new(...args: any[]): object } >
//   (Constructor: T) {
//     return class extends Constructor {
//       constructor(...args: any[]) {
//         super(...args)
//
//         const el = document.querySelector(config.selector)!
//         el.innerHTML = config.template
//       }
//     }
//   }
// }
//
// function Bind(_: any, _2: any, descriptor: PropertyDescriptor): PropertyDescriptor {
//   const original = descriptor.value
//
//   return {
//     configurable: true,
//     enumerable: false,
//     get() {
//       return original.bind(this)
//     }
//   }
// }
//
// @Component({
//   selector: '#card',
//   template: `
//     <div class="card">
//       <div class="card-content">
//         <span class="card-title">Card Component</span>
//       </div>
//     </div>
//   `
// })
// class CardComponent {
//   constructor(public name: string) {
//   }
//
//   @Bind
//   logName(): void {
//     console.log(`Component Name: ${this.name}`)
//   }
// }
//
// const card = new CardComponent('My Card Component')
//
// const btn = document.querySelector('#btn')!
//
// btn.addEventListener('click', card.logName)

// ================

type ValidatorType = 'required' | 'email'

interface ValidatorConfig {
  [prop: string]: {
    [validateProp: string]: ValidatorType
  }
}

const validators: ValidatorConfig = {}

function Required(target: any, propName: string) {
  validators[target.constructor.name] = {
    ...validators[target.constructor.name],
    [propName]: 'required'
  }
}

function validate(obj: any): boolean {
  const objConfig = validators[obj.constructor.name]
  if (!objConfig) {
    return true
  }
  let isValid = true
  Object.keys(objConfig).forEach(key => {
    if (objConfig[key] === 'required') {
      isValid = isValid && !!obj[key]
    }
  })
  return isValid
}

// class Form {
//   @Required
//   public email: string | void
//
//   constructor(email?: string) {
//     this.email = email
//   }
// }
//
// const form = new Form('v@mail.ru')
//
// if (validate(form)) {
//   console.log('Valid: ', form)
// } else {
//   console.log('Validation Error')
// }
//
