var initialCats = [
    {
        clickCount: 0,
        name: 'Cat 1',
        imgSrc: 'img/22252709_010df3379e_z.jpg',
        nicknames: ['Nick 1', 'Nick 2', 'Nick 3']
    },
    {
        clickCount: 0,
        name: 'Cat 2',
        imgSrc: 'img/434164568_fea0ad4013_z.jpg',
        nicknames: ['Nick 4', 'Nick 5']
    },
    {
        clickCount: 0,
        name: 'Cat 3',
        imgSrc: 'img/1413379559_412a540d29_z.jpg',
        nicknames: ['Nick 6']
    },
    {
        clickCount: 0,
        name: 'Cat 4',
        imgSrc: 'img/4154543904_6e2428c421_z.jpg',
        nicknames: ['Nick 7', 'Nick 8']
    },
    {
        clickCount: 0,
        name: 'Cat 5',
        imgSrc: 'img/9648464288_2516b35537_z.jpg',
        nicknames: ['Nick 9', 'Nick 10', 'Nick 11']
    }
];

var Cat = function (data) {
    this.clickCount = ko.observable(data.clickCount);
    this.name = ko.observable(data.name);
    this.imgSrc = ko.observable(data.imgSrc);
    this.nicknames = ko.observableArray(data.nicknames);

    this.level = ko.computed(function () {
        if (this.clickCount() < 3) { return "Newbron" } else
            if (this.clickCount() < 6) { return "Infant" } else
                if (this.clickCount() < 9) { return "Child" } else
                    if (this.clickCount() < 12) { return "Teen" } else
                        if (this.clickCount() < 15) { return "Adult" } else
                            return "Ninja";
    }, this);
}

var ViewModel = function () {
    var self = this;

    this.catList = ko.observableArray([]);

    initialCats.forEach(function(catItem){
        self.catList.push(new Cat(catItem));
    });

    this.currentCat = ko.observable(this.catList()[0]);
    
    this.setCurrentCat = function (cat){
        self.currentCat(cat);
    };

    this.incrementCounter = function () {
        self.currentCat().clickCount(self.currentCat().clickCount() + 1);
    };
}

ko.applyBindings(new ViewModel());