class BookController {
    constructor(view, config) {
        this.view = view;
        this.config = config;
    }

    async fetchBookData() {
        try {
            const response = await fetch(this.config.book_api_url);
            const data = await response.json();

            if (data.success) {
                const bookData = data.data;
                const books = []
                for (const b of bookData) {
                    const book = new Book(
                        b.id,
                        b.title,
                        b.description,
                        b.author
                    );
                    books.push(book);
                }

                return books
            } else {
                console.error('Error fetching book data:', data.message);
            }
        } catch (error) {
            console.error('Error fetching book data:', error);
        }
    }

    async fetchBookById(bookId) {
        try {
            if (!this.config) {
                console.error('Configuration not loaded. Aborting data fetch by ID.');
                return;
            }

            const url = `${this.config.book_api_url}/${bookId}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.success) {
                const bookData = data.data;
                const book = new Book(
                    bookData.id,
                    bookData.title,
                    bookData.description,
                    bookData.author
                );

                this.view.render(book);
            } else {
                console.error('Error fetching book data by ID:', data.message);
            }
        } catch (error) {
            console.error('Error fetching book data by ID:', error);
        }
    }

    async updateBookData(id, updatedBookData) {
        try {
            if (!this.config) {
                console.error('Configuration not loaded. Aborting data update.');
                return;
            }

            const response = await fetch(`${this.config.book_api_url}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedBookData),
            });

            const data = await response.json();

            if (data.success) {
                console.log('Book data updated successfully:');
            } else {
                console.error('Error updating book data:');
            }
        } catch (error) {
            console.error('Error updating book data:', error);
        }
    }

    async deleteBookById(bookId) {
        try {
            if (!this.config) {
                console.error('Configuration not loaded. Aborting book deletion by ID.');
                return;
            }

            const url = `${this.config.book_api_url}/${bookId}`;
            const response = await fetch(url, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (data.success) {
                console.log('Book deleted successfully:');
            } else {
                console.error('Error deleting book by ID:');
            }
        } catch (error) {
            console.error('Error deleting book by ID:', error);
        }
    }

    async createBook(newBookData) {
        try {
            if (!this.config) {
                console.error('Configuration not loaded. Aborting book creation.');
                return;
            }

            const response = await fetch(this.config.book_api_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBookData),
            });

            const data = await response.json();

            if (data.success) {
                console.log('Book created successfully');
            } else {
                console.error('Error creating book:', data.message);
            }
        } catch (error) {
            console.error('Error creating book:', error);
        }
    }
}