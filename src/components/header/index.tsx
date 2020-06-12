import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import { Link } from "gatsby";
import headerStyles from "./header.module.css";

type Props = {
  siteTitle: string;
};

const Header = (props: Props) => {
  const { siteTitle } = props;
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Nav
      activeKey="/home"
      onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    >
      <Nav.Item>
        <Nav.Link href="/home">Active</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">Link</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">Link</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="disabled" disabled>
          Disabled
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
