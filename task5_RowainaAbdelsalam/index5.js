var loggedin=false;
var addedToCart =false;
var root=document.getElementById('pro-card');

function handleNavClick(event) {
  // Remove active class from all links
  const links = document.querySelectorAll('.navbar li a');
  links.forEach(link => link.classList.remove('active'));

  // Add active class to the clicked link
  event.target.classList.add('active');
}

// Attach the click event listener to each link
const navLinks = document.querySelectorAll('.navbar li a');
navLinks.forEach(link => link.addEventListener('click', handleNavClick));



//fetch the data from json file

const render_pro=()=>{
  fetch(`http://localhost:8000/products`)
  .then((res)=>{
    console.log(res);
    
    return res.json();
  }).then((data)=>{
    console.log(data);
    
    render_products(data);
  })
}
render_pro();

//render products

const render_products=(data)=>{
  root.innerHTML="";
  for(let i=0;i<data.length;i++){
    root.innerHTML+=`
      <div class="card">
        <img src=${data[i].img} alt="">
        <span>${data[i].brand}</span>
        <h4>${data[i].title}</h4>
        <div class="stars">
          <i class="ri-star-s-fill"></i>
          <i class="ri-star-s-fill"></i>
          <i class="ri-star-s-fill"></i>
          <i class="ri-star-s-fill"></i>
        </div>
        <div class="price">
        <h4>${data[i].price} <span>EGP</span></h4>
        <button onclick="details('${data[i].id}')">details</button>
        <a href="#" onclick="add_cart('${data[i].id}')"><i class="ri-shopping-cart-2-line cart"></i></a>
        </div>
  
      </div>`
  }
}

/*async function fetch_product(url) {
  const respons = await fetch(url);
  console.log(respons)
  const data = await respons.json();
  render_products(data)
  
}
fetch_product(`http://localhost:8000/products`);*/

// fetch one element

const details=(id)=>{
  fetch(`http://localhost:8000/products?id=${id}`)
  .then((res)=>{
    return res.json();
  }).then((data)=>{
    root.innerHTML=`
    <section class="product-details">
    <div class="imgs-container">
      <img src="${data[0].img}" alt="" id="MainImg" width>
      <div class="small-img-group">
        <div class="small-img-group-col">
          <img src="imgs/f2.jpg" alt="" class="small-img">
        </div>
        <div class="small-img-group-col">
          <img src="imgs/f3.jpg" alt="" class="small-img">
        </div>
        <div class="small-img-group-col">
          <img src="imgs/f4.jpg" alt="" class="small-img">
        </div>
        <div class="small-img-group-col">
          <img src="imgs/f5.jpg" alt="" class="small-img">
        </div>
      </div>
    </div>
    <div class="details">
      <h4 class="brand">${data[0].brand}</h4>
      <h3 class="title">${data[0].title}</h3>
      <div class="price">
        <h4>${data[0].price}<span>EGP</span></h4>
      </div>
      <select name="" id="">
        <option>Select size</option>
        <option>XXL</option>
        <option>XL</option>
        <option>Large</option>
        <option>Meduim</option>
        <option>Small</option>
      </select>
      <input type="number" value="1" min="1">
      <button onclick="add_cart('${data[0].id}')">Add To Cart</button>
        
      <button onclick="Delete('${data[0].id}')">delete</button>
      <h4>Product Details</h4> 
      <span>Lorem ipsum dolor,
         sit amet consectetur adipisicing elit.
          Consectetur ab sunt amet voluptas corporis rem,
           ad distinctio quisquam, quaerat voluptatem quam,
         quibusdam illum ullam officia doloremque ut vitae nisi dolore.
      </span>
      
    </div>
  </section>`
  })
}
//small imgs
var MainImg = document.getElementById('MainImg');
const smallImgs = document.getElementsByClassName('small-img');
for (let i = 0; i < smallImgs.length; i++) {
  smallImgs[i].onclick = function() {
    MainImg.src = this.src;
  }
}


//dalate
const Delete=(id)=>{
  fetch(`http://localhost:8000/products/${id}`,{method:'DELETE'})
  .then((res)=>{
    return res.json();
  }).then((data)=>{
    console.log(data);
    
  })
}




//password eye

const show =(loginPass,loginEye)=>{
  const input = document.getElementById(loginPass),
        iconEye = document.getElementById(loginEye)

  iconEye.addEventListener('click',()=>{
    if(input.type =='password'){
      input.type='text'

      iconEye.classList.add('ri-eye-line')
      iconEye.classList.remove('ri-eye-close-line')
    }else{
      input.type='password'

      iconEye.classList.add('ri-eye-close-line')
      iconEye.classList.remove('ri-eye-line')
    }
  })
}

//shopping cart icon 


//render cart
const render_car=()=>{
  fetch(`http://localhost:8000/cart`)
  .then((res)=>{
    console.log(res);
    
    return res.json();
  }).then((data)=>{
    console.log(data);
    
    render_cart(data);
  })
}

const render_cart = (cart) => {
  if (loggedin == true) {
    root.innerHTML='';
    for(let i=0;i<cart.length;i++){
      root.innerHTML += `
      <div class="card">
        <img src=${cart[i].productImg} alt="">
        <span>${cart[i].productBrand}</span>
        <h1>${cart[i].productTitle}</h1>
  
        <div class="stars">
          <i class="ri-star-s-fill"></i>
          <i class="ri-star-s-fill"></i>
          <i class="ri-star-s-fill"></i>
          <i class="ri-star-s-fill"></i>
        </div>

        <div class="price">
        <h4>${cart[i].productPrice} <span>EGP</span></h4>
        <button href="" onclick="RemoveFromCart('${cart[i].id}')">Remove</button>
        </div>`
    }
  }else{
    render_login();
    document.getElementById("res").innerHTML="please login first";
  }
}


// cart 

const add_cart=(id)=>{
  addedToCart=true;
  fetch(`http://localhost:8001/products?id=${id}`)
  .then((res)=>{
    return res.json();
  }).then((data)=>{
    productImg=data[0].img;
    productTitle=data[0].title;
    productPrice=data[0].price;
    productBrand=data[0].brand;
    var cartItem={productImg,productTitle,productPrice,productBrand};
    cartData=JSON.stringify(cartItem)
    fetch(`http://localhost:8000/cart`,{method:'POST',
      headers:{'content-type':'application/josn'},
      body:cartData
    })
    alert("added to cart")
  })
}

/*async function addToCart(productId) {
  try {

    // Add product to cart
    const cartResponse = await fetch(`http://localhost:8000/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productId),
    });
    const cartData = await cartResponse.json();

    console.log('Cart data:', cartData);
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
}*/

//remove from cart 

const RemoveFromCart=(id)=>{
  fetch(`http://localhost:8000/cart/${id}`,{method:'DELETE'})
  .then((res)=>{
    return res.json();
  }).then((data)=>{
    alert("removed from cart")
    
  })
}


//loginLogoutLink

const toggle_login=()=>{
  function toggleLinkText(){
    const anchorTag=document.getElementById("loginLogoutLink");
    const currntText=anchorTag.textContent;

    if(currntText=="Login"){
      anchorTag.textContent='Logout';
    }else{
      anchorTag.textContent="Login"
    }
  }

  toggleLinkText();

}

//
const render_signup_toggle=()=>{
  const anchorTag=document.getElementById("loginLogoutLink");
  if(anchorTag.textContent=="Login"){
    render_signup();
  }else{
    logout();
  }
}
//render signin

const render_signup=()=>{
  root.innerHTML=`
  <div class="sign-up">
    <div class="form">
      <h1>Sign up Now</h1>
      <h4 id="res"></h4>
      <form id="form" onsubmit="signup()">
      <div class="signup-box">
        <i class='bx bx-user login-icon'></i>
        <div class="input-box">
          <input class="inp" type="email" id="e-mail" placeholder=" " required >
          <label for="" class="lbl">Email</label>
        </div>
      </div>

       <div class="signup-box">
          <i class='bx bxs-lock login-icon' ></i>
          <div class="input-box">
            <input type="password" class="inp" id="login-pass" placeholder=" " required>
            <label for="" class="lbl">Password</label>
            <i class="ri-eye-close-line login-eye" id="login-eye"></i>
          </div>
        </div>
  
      <div class="signup-box">
        <i class='bx bx-user login-icon'></i>
        <div class="input-box">
          <input type="text" id="name" placeholder=" " required class="inp">
          <label for="" class="lbl">User Name</label>
        </div>
      </div>
  
  
      <div class="check">
        <input type="checkbox">
        <label for="">agree to terms and condition</label>
      </div>
  
      <input type="submit" class="btn" >
  
      <div class="or">
      
      <p>OR
      </p>
      
      </div>
  
  
      <button class="btn">Sign up with google</button>
  
      <div class="login-link">
        <p>Do you have an account? <a href="#" onclick="render_login()">Sign in </a></p>
      </div>
  
    </div>
  </div>`

  show('login-pass','login-eye');

}


//signup

const signup = ()=>{
  var email=document.getElementById("e-mail").value;
  var password=document.getElementById("login-pass").value;
  var userName=document.getElementById('name').value;
  var user={email,password,userName};
  var dataa = JSON.stringify(user);
  fetch(`http://localhost:8001/users?email=${email}`)
  .then((res)=>{
    return res.json();
  }).then((data)=>{
    if(data[0]){
      document.getElementById('res').innerHTML='this email already signed up please login';
    }else{
      fetch(`http://localhost:8001/users`,{method:'POST',
        headers:{'content-type':'application/josn'},
        body:dataa
      }).then((res)=>{
        return res.json();
      }).then((data)=>{
        console.log(data);
      })
    }
  })
  
  /*if(users.length==0){
    users.push(user);
    render_pro();
    console.log(users);
  }else{
    for(let i=0;i<users.length;i++){
      if(users[i].email===email&&users[i].password===password){
        found=true;
        break;
      }
    }
    if(found===false){
      users.push(user);
      render_pro();
      console.log(users);
    }else{
      document.getElementById("res").innerHTML="this email already signd up";
    }
  }*/
}


//render login

const render_login=()=>{
  root.innerHTML=`
  
  <div class="log-in">
   <div class="form">
      <h1>Login</h1>
      <h4 id="res"></h4>
          <div class="login-box">
            <i class='bx bx-user login-icon'></i>
            <div class="input-box">
              <input type="email" class="inp" id="e-mail" required placeholder=" ">
              <label for="" class="lbl">Email</label>
            </div>
          </div>

        <div class="login-box">
          <i class='bx bxs-lock login-icon' ></i>
          <div class="input-box">
            <input type="password" class="inp" id="login-pass" placeholder=" " >
            <label for="" class="lbl">Password</label>
            <i class="ri-eye-close-line login-eye" id="login-eye"></i>
          </div>
        </div>

      <div class="remember-forget">
        <div class="check">
          <input type="checkbox">
          <label for="">Remember me</label>
        </div>
        <a href="#">forgot password?</a>
      </div>

      <button class="btn" onclick="login()">Login</button>

      <div class="register-link">
        <p>dont have an account?
          <a href="#" onclick="render_signup()">Sign up</a>
        </p>
      </div>
    </div>
  </div>
  `
 
  show('login-pass','login-eye')
}



//login

const login = () => {
  var email = document.getElementById("e-mail").value;
  var pass = document.getElementById("login-pass").value;

  fetch(`http://localhost:8001/users?email=${email}`)
  .then((res)=>{
    return res.json()
  }).then((data)=>{
    console.log(data);
    if(data[0]){
      if(data[0].password == pass){
        loggedin=true;
        toggle_login();
        render_pro();
      }else{
        document.getElementById("res").innerHTML='incorrect password';
      }
    }else{
      document.getElementById("res").innerHTML='This email is not signed up';
    }
  })

 /* if(fetch(`http://localhost:8000/cart?email=${email}`)){
    if(fetch(`http://localhost:8000/cart?password=${password}`)){
      loggedin = true;
      toggle_login();
      render_pro();
    }else{
      document.getElementById("res").innerHTML="incorect password";
    }
  }else{
    document.getElementById("res").innerHTML="please sign up first";
  }*/

  /*if (users.length == 0) {
    document.getElementById("res").innerHTML = "please sign up first";
  } else {
    for (let i = 0; i < users.length; i++) {
      if (users[i].email == email && users[i].password == password) {
        loggedin = true;
        toggle_login();
        render_pro();

      } else {
        document.getElementById("res").innerHTML = "incorrect";
      }
    }
  }*/
}


//logout

const logout=()=>{
 /* if(users.length==0){
    render_login();
    document.getElementById("res").innerHTML="please login first";
  }else{
    users.length-=1;
    loggedin=false;
    console.log(users.length);
    render_signup();
    toggle_login();
  }*/

    loggedin=false;
    render_signup();
    toggle_login();
}

//render add

const render_add=()=>{
  if(loggedin==true)
    {
    root.innerHTML=`
    <div class="add">
      <h1>ADD</h1>
      <input id="title" type="text" placeholder="title">
      <input id="des" type="text" placeholder="description">
      <input id="brand" type="text" placeholder="brand">
      <input id="price" type="number" placeholder="price">
      <button id="btn_add" onclick="add()">ADD</button>
    </div>
    `
  }else{
    render_login();
    document.getElementById("res").innerHTML="please login first";
  
  }

}

// add

const add=()=>{
  var description=document.getElementById("des").value;
  var title=document.getElementById("title").value;
  var price=document.getElementById("price").value;
  var brand=document.getElementById("brand").value;
  var img="imgs/img1.jpg";
  var product={img,title,description,price,brand};
  var data=JSON.stringify(product);

  fetch(`http://localhost:8001/products`,{
    method:'POST',
    headers:{'content-type':'application/json'},
    body:data
  })
  .then((res)=>{
    return res.json();
  }).then((data)=>{
    render_pro();
  })
}

//search
/*const BASE_URL = 'http://localhost:8000';

const generateProductHTML = (product) => {
  return `
    <div class="card">
      <img src="${product.img}" alt="${product.title}">
      <span>${product.brand}</span>
      <h1>${product.title}</h1>
      <p>${product.description}</p>
      <div class="price">
        <h4>${product.price} <span>EGP</span></h4>
        <button><i class='bx bx-cart-add'></i></button>
      </div>
    </div>
  `;
};

const search = () => {
  root.innerHTML = '';

  const searchQuery = document.getElementById('search').value;
  const url = `${BASE_URL}/products?title=${searchQuery}&description=${searchQuery}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      data.forEach(product => {
        root.innerHTML += generateProductHTML(product);
      });
    })
    .catch(error => {
      console.error('Error searching products:', error);
    });
};*/


const search=()=>{
  root.innerHTML='';
  var search=document.getElementById('search').value;
  fetch(`http://localhost:8001/products?titel=${search}`)
  .then((res)=>{
    return res.json();
  }).then((data)=>{
    console.log(data)
    for(let i=0;i<data.length;i++){
      root.innerHTML+=`
        <div class="card">
          <img src=${data[i].img} alt="">
          <span>${data[i].brand}</span>
          <h1>${data[i].title}</h1>
  
          <p>${data[i].description}</p>
          <div class="price">
          <h4>${data[i].price} <span>EGP</span></h4>
          <button><i class='bx bx-cart-add'></i></button>
          </div>
  
        </div>`
      }
    })
  /*for(let i=0;i<products.length;i++){
    if(products[i].title.includes(search)||products[i].description.includes(search)){
      root.innerHTML+=`
      <div class="card">
        <img src=${products[i].img} alt="">
        <span>${products[i].brand}</span>
        <h1>${products[i].title}</h1>

        <p>${products[i].description}</p>
        <div class="price">
        <h4>${products[i].price} <span>EGP</span></h4>
        <button><i class='bx bx-cart-add'></i></button>
        </div>

      </div>`
    }
  }*/
  if(root.innerHTML==''){
    root.innerHTML=`
    <h2>No matches for the word ${search}</h2>
    `
  }
}


//price range 
/*const priceRange = document.getElementById('price-range');
const priceValue = document.getElementById('price-value');
priceRange.addEventListener('input', function(){
  priceValue.innerHTML = priceRange.value;
  updateProducts();
});

function updateProducts() {
  root.innerHTML = '';
  for(let i=0;i<products.length;i++){
    if(parseInt(priceRange.value) >= products[i].price){
      root.innerHTML+=`
      <div class="card">
        <img src=${products[i].img} alt="">
        <span>${products[i].brand}</span>
        <h1>${products[i].title}</h1>
        <p>${products[i].description}</p>
        <div class="price">
        <h4>${products[i].price} <span>EGP</span></h4>
        <button>add to card</button>
        </div>
      </div>`;
    }
  }
}*/