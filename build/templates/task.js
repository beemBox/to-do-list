export default{get task(){const t=document.createElement("template");return t="\n      <div class='task-item'>\n        <slot name='title'><span class='task-item__title'></span></slot>\n        <slot name='observations'><span class='task-item__observations'></span></slot>\n        <slot name='edit__btn'><button class='task-item__edit'></button></slot>\n        <slot name='delete__btn'><button class='task-item__delete'></button></slot>\n      </div>\n    ",t}};