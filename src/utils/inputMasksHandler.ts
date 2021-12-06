export class InputMask {  
  cpf (v: string): string {    
    v = v.replace(/\D/g, '')
    v = v.replace(/^(\d{3})(\d)/g, '$1.$2')
    v = v.replace(/^(\d{3})\.(\d{3})(\d)/g, '$1.$2.$3')
    v = v.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/g, '$1.$2.$3-$4')
  
    return v.substring(0, 14)
  }
  
  cnpj (v: string): string {
    v = v.replace(/\D/g, '')
    v = v.replace(/^(\d{2})(\d)/g, '$1.$2')
    v = v.replace(/^(\d{2}).(\d{3})(\d)/g, '$1.$2.$3')
    v = v.replace(/^(\d{2}).(\d{3}).(\d{3})(\d)/g, '$1.$2.$3/$4')    
    v = v.replace(/^(\d{2}).(\d{3}).(\d{3}).(\d{4})(\d)/g, '$1.$2.$3/$4-$5')
  
    return v.substring(0, 18)
  }
  
  rg (v: string): string {
    v = v.replace(/\D/g, '')

    v = v.replace(/^(\d{1})(\d)/g, '$1.$2')
    v = v.replace(/^(\d{1}).(\d{3})(\d)/g, '$1.$2.$3')
    v = v.replace(/^(\d{1}).(\d{3}).(\d{3})(\d)/g, '$1.$2.$3')

    return v.substring(0, 9)
  }

  phone (v: string): string {
    v = v.replace(/\D/g, '')
  
    v = v.replace(/^(\d{2})(\d)/g, '$1 $2')
    v = v.replace(/^(\d{2}).(\d{4})(\d)/g, '$1 $2-$3')
  
    return v.substring(0, 12)
  }
  
  celphone (v: string): string {
    v = v.replace(/\D/g, '')
  
    v = v.replace(/^(\d{2})(\d)/g, '$1 $2')
    v = v.replace(/^(\d{2}).(\d{4})(\d)/g, '$1 $2-$3')    
  
    return v.substring(0, 12)
  }

  cep (v: string): string {
    v = v.replace(/\D/g, '')
  
    v = v.replace(/^(\d{2})(\d)/g, '$1.$2')
    v = v.replace(/^(\d{2}).(\d{3})(\d)/g, '$1.$2-$3')    
    v = v.replace(/^(\d{2}).(\d{3}).(\d{3})(\d)/g, '$1.$2-$3')    
  
    return v.substring(0, 10)
  }



}
