import type { Book } from "@/types/book.types";

export const mockBooks : Book[] = [
    {
        id: "1",
        title: "Project Hail Mary",
        author: "Andy Weir",
        genre: "Science Fiction",
        coverUrl: "https://m.media-amazon.com/images/I/51-1T3EnODL._SY445_SX342_FMwebp_.jpg",
        status: "currently-reading",
        progress: 65,
        isFavorite: false,
        addedAt: '2026-06-01'
    },
    {
        id: "2",
        title: "The Midnight Library",
        author: "Matt Haig",
        genre: "Fiction",
        coverUrl: "https://m.media-amazon.com/images/I/710Te7YUNqL._SY522_.jpg",
        status: "want-to-read",
        progress: 0,
        isFavorite: false,
        addedAt: '2026-06-01'
    },
    {
        id: "3",
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
        coverUrl: "https://m.media-amazon.com/images/I/71OF35MLUEL._AC_UL480_FMwebp_QL65_.jpg",
        status: "read",
        progress: 100,
        isFavorite: true,
        addedAt: '2026-06-01'
    },
    {
        id: "4",
        title: "Dune",
        author: "Frank Herbert",
        genre: "Science Fiction",
        coverUrl: "https://m.media-amazon.com/images/I/71m91l0treL._AC_UL480_FMwebp_QL65_.jpg",
        status: "want-to-read",
        progress: 0,
        isFavorite: false,
        addedAt: '2026-06-01'
    },
    {
        id: "5",
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
        coverUrl: "https://images-na.ssl-images-amazon.com/images/I/71kxa1-0mfL.jpg",
        status: "read",
        progress: 100,
        isFavorite: true,
        addedAt: '2026-06-01'
    }
]