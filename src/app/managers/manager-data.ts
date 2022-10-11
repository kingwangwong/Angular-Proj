import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Manager as Manager } from './manager';

export class ManagerData implements InMemoryDbService {

  createDb(): { managers: Manager[]} {
    const managers: Manager[] = [
      {
        id: 1,
        managerName: "Angela",
        company: "McDonalds",
        description: "Manager at mcdonalds",
        tags: ['honest', 'hard-working'],
        rating: 3.2,
        imageUrl: "assets/images/fred.jpg"
    },
    {
        id: 2,
        managerName: "Shawn",
        company: "WhichWich",
        description: "Sandwiches.",
        tags: ['respectful', 'happy'],
        rating: 4.3,
        imageUrl: "assets/images/boom.jpg"
    },
    {
        id: 3,
        managerName: "Tyler",
        company: "PizzaModd",
        description: "Pizza restaurant.",
        tags: ['honest', 'respectful'],
        rating: 3.9,
        imageUrl: "assets/images/lg.jpg"
    },
    {
        id: 4,
        managerName: "Abdul",
        company: "MagiciansRed",
        description: "Magical.",
        tags: ['happy', 'punctual'],
        rating: 2.2,
        imageUrl: "assets/images/sad.jpg"
    },
    {
        id: 5,
        managerName: "Caesar",
        company: "Arby's",
        description: "Deli and burger.",
        tags: ['honest', 'respectful'],
        rating: 3.7,
        imageUrl: "assets/images/alan.jpg"
    }
    ];
    return { managers };
  }
}
