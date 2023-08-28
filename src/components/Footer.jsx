function Footer(){
    let year = new Date().getFullYear()
  return (
    <footer className="text-left">
        <p>Created by <a href="https://francoulibaly.com" target="_blank">Frances</a> 	&copy;{year}</p>
      </footer>
  )  
}

export default Footer;