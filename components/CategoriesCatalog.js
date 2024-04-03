import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function CategoriesCatalog({ categories }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedCategories, setSortedCategories] = useState([]);

  // Effect to sort categories alphabetically on component mount
  useEffect(() => {
    const sorted = sortCategories(categories);
    setSortedCategories(sorted);
  }, [categories]);

  // Sort categories alphabetically by name
  const sortCategories = (categoriesToSort) => {
    return [...categoriesToSort].sort((a, b) => a.name.localeCompare(b.name));
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    // Filter and sort categories based on the search term
    const filteredCategories = categories.filter(
      (category) => category.name.toLowerCase().includes(searchTerm)
    );

    setSortedCategories(sortCategories(filteredCategories));
  };

  return (
    <div>
      <section className="section categories" id="categories">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="section-heading">
                <h6>All categories</h6>
                <h2>All categories</h2>
              </div>
            </div>
          </div>
          <div>
            <div>
              <input
                type="text"
                placeholder="Search for a category..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="shadow appearance-none border rounded w-full py-1 px-4 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="row event_box">
            {sortedCategories.map((category) => (
              <div
                key={category._id}
                className="col-lg-4 col-md-6 align-self-center mb-30 event_outer col-md-6"
              >
                <div className="events_item">
                  <div className="thumb">
                    <a href={`/category/${category._id}`}>
                      <Image
                        src={category.categoryImage[0]}
                        alt=""
                        width={300}
                        height={180}
                        objectFit="cover"
                        className="course-image"
                      />
                    </a>
                    <span className="category">
                      {category.parent ? category.parent.name + ' > ' : ''}
                      {category.name}
                    </span>
                  </div>
                  <div className="down-content">
                    <span className="author">{category.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
