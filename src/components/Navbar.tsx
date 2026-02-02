import {Button, Container, Nav, Navbar as NavbarBS, Form } from "react-bootstrap" 
import { NavLink, useNavigate } from "react-router-dom"
import { useShoppingCart } from "../context/ShoppinCartContext"
import { useState, useRef} from "react"
import { NavDropdown } from 'react-bootstrap';

export function Navbar() {

    const { openCart, cartQuantity} = useShoppingCart()
     const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState<string>('')
    const searchTimer = useRef<number | null>(null)



     const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchQuery(value)

        if (searchTimer.current) {
            clearTimeout(searchTimer.current)
        }
        
        searchTimer.current = setTimeout(() => {
            if (value.trim()) {
                navigate(`/search?q=${encodeURIComponent(value)}`)
            }
        }, 1000)
    }

            const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
        }
    }

    return <NavbarBS sticky="top" className="bg-white shadow-sm mb-3">
        <Container>
            <Nav className="me-auto">
            <Nav.Link to="/" as={NavLink}>Home</Nav.Link>
            <Nav.Link to="/Store" as={NavLink}>Store</Nav.Link>

                <NavDropdown title="Categories" id="basic-nav-dropdown">
      <NavDropdown.Item as={NavLink} to="/store/category/electronics">
        Electronics
      </NavDropdown.Item>
      <NavDropdown.Item as={NavLink} to="/store/category/jewelery">
        Jewelery
      </NavDropdown.Item>
      <NavDropdown.Item as={NavLink} to="/store/category/men's clothing">
        Men's Clothing
      </NavDropdown.Item>
      <NavDropdown.Item as={NavLink} to="/store/category/women's clothing">
        Women's Clothing
      </NavDropdown.Item>
    </NavDropdown>

            <Nav.Link to="/About" as={NavLink}>About</Nav.Link>

           <Form className="ms-3 form-control form-control-sm w-100 w-md-auto" onSubmit={handleSearchSubmit}>
                    <input 
                        type="search" 
                        placeholder="Поиск товаров..."
                        className="form-control form-control-sm"
                        style={{ width: "200px" }}
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Escape') {
                                setSearchQuery('')
                            }
                        }}
                        
                    />
                </Form>

            </Nav>
            {cartQuantity > 0 && (
            <Button 
            onClick={openCart}
            style={{width: "3.5rem", height: "3.5rem", position:"relative"}}
            variant="outline-primary"
            className="rounded-circle"><svg enable-background="new 0 0 30 30" height="30px" id="Capa_1" version="1.1" viewBox="0 0 30 30" width="30px" xmlns="http://www.w3.org/2000/svg"><path d="M9,9c0,0,1.8-1.8,5.2-5.2c0.5-0.5,0.9-0.7,1.7,0c0.7,0.7,5.4,5.1,5.5,5.2c0.1,0.1,0.3,0.2,0.5,0.2  c0.2,0,0.4-0.1,0.5-0.2c0.3-0.3,0.3-0.8,0-1.1c-0.2-0.2-4.8-4.5-5.5-5.2c-1.2-1.1-2.6-1.1-3.7,0C9.7,6.1,7.9,7.9,7.9,7.9  C7.6,8.2,7.6,8.7,7.9,9S8.7,9.3,9,9z M29.1,9.8H0.9c-0.4,0-0.8,0.3-0.8,0.8V15c0,0.4,0.3,0.8,0.8,0.8h1.9c0,0,0,0,0,0l1.4,10.6  c0,1,0.8,1.9,1.9,1.9h17.6c1,0,1.8-0.8,1.9-1.8L27,15.8c0,0,0-0.1,0-0.1h2.1c0.4,0,0.8-0.3,0.8-0.8v-4.4  C29.8,10.1,29.5,9.8,29.1,9.8z M24.1,26.2c0,0,0,0.1,0,0.1c0,0.2-0.2,0.4-0.4,0.4H6.1c-0.2,0-0.4-0.2-0.4-0.5L4.3,15.7h21.2  L24.1,26.2z M28.3,14.2H1.7v-2.9h26.7V14.2z" fill="#262324"/></svg>
            <div className="rounded-citcle bg-danger d-flex justify-content-center align-items-center" style={{
                color:"white", 
            width: "1.5rem", 
            height:"1.5rem", 
            position: "absolute", 
            bottom: 0, 
            right: 0,
            transform: "translate(25%, 25%"}}>{cartQuantity}</div>
            
            </Button>
            )}
        </Container>
    </NavbarBS>
}

