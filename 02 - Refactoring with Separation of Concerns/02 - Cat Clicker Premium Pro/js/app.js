var model = {

    adminMode: false,

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
        {
            name: "cat-5",
            file: "img/cat-5.jpg",
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

        while (this.catList.firstChild) {
            this.catList.removeChild(this.catList.firstChild);
        }

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

var adminView = {

    init: function () {
        this.adminButton = document.getElementById('admin-button');
        this.adminButton.addEventListener("click", function () {
            octopus.toggleAdminMode();
        });

        this.adminForm = document.getElementById("admin-form");
        this.catName = document.getElementById("input-cat-name");
        this.catImg = document.getElementById("input-cat-img");
        this.catCounter = document.getElementById("input-cat-counter");

        this.adminCancel = document.getElementById('admin-cancel');
        this.adminCancel.addEventListener("click", function () {
            octopus.cancelAdminForm();
        });

        this.adminSave = document.getElementById('admin-save');
        this.adminSave.addEventListener("click", function () {

            var catName = document.getElementById("input-cat-name").value;
            var catImg = document.getElementById("input-cat-img").value;
            var catCounter = document.getElementById("input-cat-counter").value;

            octopus.saveAdminForm(catName, catImg, catCounter);
        });

        this.render();
    },

    render: function () {
        if (octopus.getAdminMode()) {
            this.adminForm.setAttribute("style", "display: block");

            var cat = octopus.getCurrentCat();
            this.catName.value = cat.name;
            this.catImg.value = cat.file;
            this.catCounter.value = cat.counter;

        } else {
            this.adminForm.setAttribute("style", "display: none");
        }
    }
};

var octopus = {

    init: function () {
        model.init();
        adminView.init();
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
        adminView.render();
        displayView.render();
    },

    currentCatClicked: function () {
        model.currentCat.counter++;
        adminView.render();
        displayView.render();
    },

    getAdminMode: function () {
        return model.adminMode;
    },

    toggleAdminMode: function () {
        model.adminMode = !model.adminMode;
        adminView.render();
    },

    cancelAdminForm: function () {
        model.adminMode = false;
        adminView.render();
    },

    saveAdminForm: function (name, file, counter) {
        model.currentCat.name = name;
        model.currentCat.file = file;
        model.currentCat.counter = counter;

        adminView.render();
        listView.render();
        displayView.render();
    }
};

window.onload = function () {
    octopus.init();
}