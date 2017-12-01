var model = {

    currentCat: null,
    catsList: [
        {
            name: "cat-1",
            file: "img/cat-1.jpg",
            counter: 0
        },
        {
            name: "cat-2",
            file: "img/cat-2.jpg",
            counter: 0
        },
        {
            name: "cat-3",
            file: "img/cat-3.jpg",
            counter: 0
        },
        {
            name: "cat-4",
            file: "img/cat-4.jpg",
            counter: 0
        },
    ],

    init: function () {
        this.currentCat = this.catsList[0];
    }
};

var displayView = {

    init: function () {
        this.display = document.getElementById("display");
        this.title = document.getElementById("cat-name");
        this.display = document.getElementById("click-counter");
        this.img = document.getElementById("cat-img");

        this.img.addEventListener("click", function () {
            octopus.currentCatClicked();
        });

        this.render();
    },

    render: function () {
        var cat = octopus.getCurrentCat();

        this.title.innerHTML = cat.name;
        this.display.innerHTML = "clicked " + cat.counter + " times";
        this.img.setAttribute("src", cat.file);
    },

};


var listView = {

    init: function () {
        this.catList = document.getElementById('list');

        this.render();
    },

    render: function () {
        var cats = octopus.getCats();
        for (i = 0; i < cats.length; i++) {

            var li = document.createElement("li");
            li.innerHTML = cats[i].name;

            li.addEventListener('click', (function (i) {
                return function () {
                    octopus.itemListClicked(i);
                }
            })(i));

            this.catList.appendChild(li);
        }
    }
};

var octopus = {

    init: function () {
        model.init();
        listView.init();
        displayView.init();
    },

    getCats: function () {
        return model.catsList;
    },

    getCurrentCat: function () {
        return model.currentCat;
    },

    itemListClicked: function (id) {
        model.currentCat = model.catsList[id];
        displayView.render();
    },

    currentCatClicked: function () {
        model.currentCat.counter++;
        displayView.render();
    }
};

window.onload = function () {
    octopus.init();
}