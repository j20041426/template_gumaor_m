global.store = {
  set (_k, _v){
      let v = JSON.stringify(_v);
      localStorage.setItem(_k, v);
  },
  get (_k){
      let v = localStorage.getItem(_k);
      if(v){
          v = JSON.parse(v);    
      }
      return v;
  },
  remove (_k){
      localStorage.removeItem(_k);
  },
  clear (){
      localStorage.clear();
  },
  setSession (_k, _v){
      sessionStorage.setItem(_k, JSON.stringify(_v));
  },
  getSession (_k){
      let v = sessionStorage.getItem(_k);
      if(v){
          v = JSON.parse(v);
      }
      return v;
  }
};

export default store;