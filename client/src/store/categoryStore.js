import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('categoryStore', {
  state: () => ({
    categories: [
      {
        title: 'U.S.',
        items: [
          {
            id: 1,
            source: 'BBC',
            title: 'Gaza war: US says floating aid pier to shut down soon',
            time: '4 hours ago',
            authors: 'Paul Adams'
          },
          {
            id: 2,
            source: 'CNBC',
            title:
              "10 states with America's worst infrastructure, and most to gain from billions in federal dollars",
            time: '7 hours ago',
            authors: 'Scott Cohn'
          },
          {
            id: 3,
            source: 'Al Jazeera',
            title: 'Russia says US missiles in Germany signal return of Cold War',
            time: '3 hours ago',
            authors: 'Author Name'
          }
        ]
      },
      {
        title: 'Entertainment',
        items: [
          {
            id: 4,
            source: 'The Washington Post',
            title: 'Shelley Duvall, a beguiling face of 1970s film, dies at 75',
            time: '47 minutes ago',
            authors: 'Harrison Smith'
          },
          {
            id: 5,
            source: 'CNBC',
            title:
              "10 states with America's worst infrastructure, and most to gain from billions in federal dollars",
            time: '7 hours ago',
            authors: 'Scott Cohn'
          },
          {
            id: 6,
            source: 'Al Jazeera',
            title: 'Russia says US missiles in Germany signal return of Cold War',
            time: '3 hours ago',
            authors: 'Author Name'
          }
        ]
      },
      {
        title: 'Sports',
        items: [
          {
            id: 7,
            source: 'ESPN',
            title: "Skenes throws 7 no-hit IP, K's 11 in Pirates' win",
            time: '2 hours ago',
            authors: 'Author Name'
          },
          {
            id: 8,
            source: 'CNBC',
            title:
              "10 states with America's worst infrastructure, and most to gain from billions in federal dollars",
            time: '7 hours ago',
            authors: 'Scott Cohn'
          },
          {
            id: 9,
            source: 'Al Jazeera',
            title: 'Russia says US missiles in Germany signal return of Cold War',
            time: '3 hours ago',
            authors: 'Author Name'
          }
        ]
      },
      {
        title: 'Technology',
        items: [
          {
            id: 10,
            source: 'The Wall Street Journal',
            title: 'The 2022 NFL Draft is coming to Las Vegas',
            time: '2 hours ago',
            authors: 'Author D'
          },
          {
            id: 11,
            source: 'CNBC',
            title:
              "10 states with America's worst infrastructure, and most to gain from billions in federal dollars",
            time: '7 hours ago',
            authors: 'Scott Cohn'
          },
          {
            id: 12,
            source: 'Al Jazeera',
            title: 'Russia says US missiles in Germany signal return of Cold War',
            time: '3 hours ago',
            authors: 'Author Name'
          }
        ]
      },
      {
        title: 'Business',
        items: [
          {
            id: 13,
            source: 'The Wall Street Journal',
            title: 'The 2022 NFL Draft is coming to Las Vegas',
            time: '2 hours ago',
            authors: 'Author D'
          },
          {
            id: 14,
            source: 'CNBC',
            title:
              "10 states with America's worst infrastructure, and most to gain from billions in federal dollars",
            time: '7 hours ago',
            authors: 'Scott Cohn'
          },
          {
            id: 15,
            source: 'Al Jazeera',
            title: 'Russia says US missiles in Germany signal return of Cold War',
            time: '3 hours ago',
            authors: 'Author Name'
          }
        ]
      }
    ],
    selectedCategories: JSON.parse(localStorage.getItem('selectedCategories')) || [],
  }),
  actions: {
    addCategory(category) {
      if (this.selectedCategories.length < 8 && !this.selectedCategories.includes(category)) {
        this.selectedCategories.push(category);
        this.saveSelectedCategories();
      }
    },
    removeCategory(category) {
      this.selectedCategories = this.selectedCategories.filter((cat) => cat !== category);
      this.saveSelectedCategories();
    },
    setSelectedCategories(categories) {
      this.selectedCategories = categories;
      this.saveSelectedCategories();
    },
    initializeDefaults() {
      if (this.selectedCategories.length === 0) {
        this.selectedCategories = this.categories.slice(0, 3);
        this.saveSelectedCategories();
      }
    },
    saveSelectedCategories() {
      localStorage.setItem('selectedCategories', JSON.stringify(this.selectedCategories));
    }
  }
});