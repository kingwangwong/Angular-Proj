import { InMemoryDbService } from 'angular-in-memory-web-api';

import { IManager } from './manager';

export class ManagerData implements InMemoryDbService {

  createDb(): { managers: IManager[]} {
    const managers: IManager[] = [
        {
            id: 1,
            managerName: "Angela",
            company: "McDonalds",
            description: "Manager at mcdonalds",
            rating: 3.2,
            imageUrl: "assets/images/fred.jpg"
        },
        {
            id: 2,
            managerName: "Shawn",
            company: "WhichWich",
            description: "Sandwiches.",
            rating: 4.3,
            imageUrl: "assets/images/boom.jpg"
        },
        {
            id: 3,
            managerName: "Tyler",
            company: "PizzaModd",
            description: "Pizza restaurant.",
            rating: 3.9,
            imageUrl: "assets/images/lg.jpg"
        },
        {
            id: 4,
            managerName: "Abdul",
            company: "MagiciansRed",
            description: "Magical.",
            rating: 2.2,
            imageUrl: "assets/images/sad.jpg"
        },
        {
            id: 5,
            managerName: "Caesar",
            company: "Arby's",
            description: "Deli and burger.",
            rating: 1.2,
            imageUrl: "assets/images/alan.jpg"
        }
    ];
    return { managers };
  }
}
