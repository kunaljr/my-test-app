const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../index');
const Book = require('../models/Books');
const { getBooks } = require('../controllers/bookController');

jest.mock('../models/Books'); // 👈 Mock the model

// 👇 mock middleware to just let requests pass through
// jest.mock('../middleware/authMiddleware', () => jest.fn((req, res, next) => next()));
// jest.mock('../middleware/roleMiddleware', () => () => (req, res, next) => next());

describe('Book Controller', () => {
  let token;

  beforeAll(() => {
    // simulate login: create token with admin role
    const userPayload = { id: 'user123', role: 'admin' };
    token = jwt.sign(userPayload, process.env.JWT_SECRET, { expiresIn: '1h' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /books', () => {
    it('should return all books', async () => {
      const books = [{ title: 'Book A', author: 'Author A' }];
      Book.find.mockResolvedValue(books);

      const res = await request(app).get('/books/');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(books);
    });
  });

  describe('Get /books/:id', () => {
    it('Should return a book by id', async () => {
      const book = { _id: 1, title: 'Book A', author: 'Author A'}
      Book.findById.mockResolvedValue(book);

      const res = await request(app).get('/books/1');
      expect(res.statusCode).toBe(200)
      expect(res.body).toEqual(book)
    })

    it('Should return 404 if book not found', async () => {
      Book.findById.mockResolvedValue(null)

      const res = await request(app).get('/books/1');
      expect(res.statusCode).toBe(404)
      expect(res.body.message).toBe('Book not found')
    })
  })

  describe('POST /book', () => {
    it('Should allow admin to create a book', async () => {
      const book = { title: 'Book A' , author: 'Author A'}
      Book.create.mockResolvedValue({...book, _id: "123"})

      const res = await request(app).post('/books').set('Authorization', `Bearer ${token}`).send(book);
      // expect(res.statusCode).toBe(201);
      // expect(res.body.title).toBe('Book A');

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(expect.objectContaining(book));
      expect(Book.create).toHaveBeenCalledWith(book);
    })

    it('should return 401 if no token is provided', async () => {
      const res = await request(app)
        .post('/books')
        .send({ title: 'No Token', author: 'Nobody' });

      expect(res.statusCode).toBe(401);
      expect(res.body.message).toBe('Token required');
    });

    it('should return 403 for non-admin role', async () => {
      const userPayload = { id: 'user456', role: 'user' };
      const nonAdminToken = jwt.sign(userPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

      const res = await request(app)
        .post('/books')
        .set('Authorization', `Bearer ${nonAdminToken}`)
        .send({ title: 'Unauthorized', author: 'User' });

      expect(res.statusCode).toBe(403);
      expect(res.body.message).toBe('Access Denied: Insufficient role');
    });

    it('should return 403 for invalid token', async () => {
      const res = await request(app)
        .post('/books')
        .set('Authorization', `Bearer invalid.token.here`)
        .send({ title: 'Invalid', author: 'Broken' });

      expect(res.statusCode).toBe(403);
      expect(res.body.message).toBe('Invalid or expired token');
    });
  })

});                                                                              