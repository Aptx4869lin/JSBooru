const BaseView = require("../components/baseView");

class FooterBar extends BaseView {
  constructor({
    items = [],
    index = 0,
    layout = (make, view) => {
      make.left.right.bottom.equalTo(view.super.safeArea);
      make.height.equalTo(50);
    },
    events
  }) {
    super()
    this.items = items
    this._index = index;
    this.layout = layout;
    this.events = events
  }

  _defineView() {
    const classThis = this
    return {
      type: "matrix",
      props: {
        id: this.id,
        columns: this.items.length,
        itemHeight: 60,
        spacing: 1,
        scrollEnabled: false,
        bgcolor: $color("white"),
        template: [
          {
            type: "image",
            props: {
              id: "image",
              bgcolor: $color("clear")
            },
            layout: function(make, view) {
              make.centerX.equalTo(view.super);
              make.width.height.equalTo(25);
              make.top.inset(7);
            }
          },
          {
            type: "label",
            props: {
              id: "label",
              font: $font(10)
            },
            layout: function(make, view) {
              var preView = view.prev;
              make.centerX.equalTo(preView);
              make.bottom.inset(13);
            }
          }
        ],
        data: this.items
      },
      layout: this.layout,
      events: {
        didSelect: async function(sender, indexPath, data) {
          classThis.index = indexPath.item
          if (classThis.events.changed) {
            classThis.events.changed(indexPath.item)
          }
        }
      }
    };
  }

  get index() {
    return this._index
  }

  set index(index) {
    this._index = index
    const data = this.view.data
    data.forEach((n, i) => {
      if (i === index) {
        n.label.textColor = $color("black");
        n.image.tintColor = $color("black");
      } else {
        n.label.textColor = $color("gray");
        n.image.tintColor = $color("gray");
      }
    })
    this.view.data = data
  }


}

module.exports = FooterBar