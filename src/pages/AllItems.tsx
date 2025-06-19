import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Pagination, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ItemCard from "../components/ItemCard/ItemCard";
import { type Item} from "./../types/Item"

const AllItems = () => {
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("https://web-production-3ca4c.up.railway.app/api/items", {
        headers: {
          Accept: "application/json",
          Authorization: ` Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setAllItems(res.data);
        setFilteredItems(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id: number) => {
    const updatedItems = filteredItems.filter((item) => item.id !== id);
    setFilteredItems(updatedItems);
    setAllItems(allItems.filter((item) => item.id !== id));
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filtered = allItems.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(filtered);
    setCurrentPage(1);
  };

  const paginateItems = (items: Item[], page: number) => {
    const start = (page - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const pageItems = [];
    const maxVisible = 5;
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (totalPages >= 5 && startPage > 1) {
      pageItems.push(
        <Pagination.Item
          key={1}
          onClick={() => setCurrentPage(1)}
          className="mx-1 custom-page"
        >
          1
        </Pagination.Item>
      );
      if (startPage > 2) {
        pageItems.push(
          <Pagination.Ellipsis
            key="start-ellipsis"
            className="mx-1 custom-ellipsis"
          />
        );
      }
    }

    for (let page = startPage; page <= endPage; page++) {
      pageItems.push(
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => setCurrentPage(page)}
          className={`mx-1 custom-page ${
            page === currentPage ? "active-orange" : ""
          }`}
        >
          {page}
        </Pagination.Item>
      );
    }

    if (totalPages >= 5 && endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageItems.push(
          <Pagination.Ellipsis
            key="end-ellipsis"
            className="mx-1 custom-ellipsis"
          />
        );
      }
      pageItems.push(
        <Pagination.Item
          key={totalPages}
          onClick={() => setCurrentPage(totalPages)}
          className="mx-1 custom-page"
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    return (
      <Pagination className="justify-content-center mt-4">
        <Pagination.Prev
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
        />
        {pageItems}
        <Pagination.Next
          onClick={() =>
            currentPage < totalPages && setCurrentPage(currentPage + 1)
          }
        />
      </Pagination>
    );
  };
  return (
    <div className="bg-white w-100 p-4 ">
      <Row className="justify-content-center mb-4">
        <Col xs={12} sm={10} md={8} lg={6} className="position-relative">
          <Form.Control
            type="search"
            placeholder="Search product by name"
            className="ps-3 pe-5 w-100"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <img
            src="/assets/imgs/search.svg"
            alt="search-icon"
            className="position-absolute top-50 end-0 translate-middle-y me-3"
            style={{ width: "20px", height: "20px" }}
          />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col className="text-end">
          <Link
            to="/dashboard/items/itemindex/add"
            className="btn btn-primary border-0 bg-color3 text-white"
          >
            ADD NEW PRODUCT
          </Link>
        </Col>
      </Row>

      <Row className="g-4">
        {paginateItems(filteredItems, currentPage).map((item) => (
          <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
            <ItemCard
              id={item.id}
              name={item.name}
              image_url={item.image_url}
              price={item.price}
              created_at={item.created_at}
              updated_at={item.updated_at}
              onDelete={handleDelete}
            />
          </Col>
        ))}
      </Row>

      {renderPagination()}
    </div>
  );
};

export default AllItems;
