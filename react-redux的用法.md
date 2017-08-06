---
title: react-redux的用法
tags: redux
---

本篇为[阮一峰：Redux 入门教程（三）：React-Redux 的用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html) 的学习笔记

React-Redux将所有组件分为两类：`UI组件`和`容器组件`。

**UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑。**

## UI组件

UI组件的特征：

```
只负责UI的呈现，不带有任何业务逻辑
没有状态(即不使用this.state这个变量)
所有数据都由参数(this.props)提供
不使用任何Redux的API
```

因为不含有状态，UI组件又称为“纯组件”，即它和纯函数一样，纯粹由参数决定它的值。

## 容器组件

容器组件的特征：

```
负责管理数据和业务逻辑，不负责UI的呈现
带有内部状态
使用Redux的API
```

Question：如果一个组件既有UI又有业务逻辑怎么办？

> 将它拆分成下面的结构：外面是一个容器组件，里面包了一个UI组件。前者负责与外部的通信，将数据传给后者，由后者渲染出视图。

React-Redux规定，所有的UI组件都由用户提供，容器组件则是由React-Redux自动生成。

## connect()

React-Redux提供connect方法，用于从UI组件生成容器组件。connect的意思是将这两种组件连起来。

语法：

```
const 容器组件 = connect(输入逻辑,输出逻辑)(UI组件);
或
const container = connect(mapStateToProps,mapDispatchToProps)(UI component)
```

**输入逻辑：外部的数据(即state对象)如何转换为UI组件的参数。**

**输出逻辑：用户发出的动作如何变为Action对象，从UI组件传出去。**

示例：

```
import { connect } from 'react-redux'

const VisibleTodoList = connect(
	mapStateToProps,
	mapDispatchToProps
)(TodoList)
```

## mapStateToProps

mapStateToProps是一个函数，它的作用就像它的名字那样，建立一个从(外部的)state对象到(UI组件的)props对象的映射关系。

mapStateToProps作为一个函数，它接受state作为参数，返回一个对象，即传到UI组件里去的props。

```
const mapStateToProps = (state) => {
  return {
    key: value
  }
}
```

**mapStateToProps会订阅Store，每当state更新的时候，就会自动执行，重新计算UI组件的参数，从而触发UI组件的重新渲染。**

mapStateToProps的第一个参数总是state对象，还可以使用第二个参数，代表容器组件的props对象。

如果传第二个参数，容器组件的参数发生变化时也会引发UI组件重新渲染。

connect方法可以省略mapStateToProps参数，那样的话，UI组件就不会订阅Store，就是说Store的更新不会引起UI组件的更新。

## mapDispatchToProps

是connect函数的第二个参数，用来建立UI组件的参数到`store.dispatch`方法的映射，也就是说，它定义了哪些用户的操作应该当做Action，传给Store。

它可以是一个函数，也可以是一个对象。

#### 1.是函数

会得到`dispatch`和`ownProps`（容器组件的props对象）两个参数。

```jsx
const mapDispatchToProps = (dispatch,ownProps)=>{
  return {
    onClick:()=>{
      dispatch({
        type:"SET_VISIBILITY_FILTER",
        filter:ownProps.filter
      });
    }
  }
}
```

返回一个对象，该对象的每个键值对都是一个映射，定义了UI组件的参数怎样发出Action。

#### 2.是对象

它的每个键名也是对应的UI组件的同名参数，键值应该是一个函数。

**会被当做Action creator，返回的Action会由Redux自动发出。**

如上例，写成对象的方式为：

```jsx
const mapDispatchToProps = {
  onClick: (filter) =>{
    type:"SET_VISIBILITY_FILTER",
    filter:filter
  }
}
```



## \<Provider\>组件

connect方法生成容器组件后，需要让容器组件拿到state对象，才能生成UI组件的参数。

如果将state对象作为参数props传入容器组件内会比较麻烦，尤其是当容器组件可能在很深的层级时。

React-Redux提供`Provider`组件，可以让容器组件拿到state。

```Jsx
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'

let store = createStore(todoApp);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

上面代码中，Provider在根组件外面包了一层，这样一来，App的所有子组件就默认都可以拿到state了。

它的原理是React组件的context属性：

```jsx
class Provider extends Component{
  getChildContext(){
    return {
      store: this.props.store
    }
  }
  render(){
    return this.props.children
  }
}

Provider.childContextTypes = {
  store: React.PropTypes.object
}
```

`store`放在了上下文对象`context`上面。然后子组件就可以从`context`拿到`store`，如下：

```Jsx
class VisibleTodoList extends Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  render() {
    const props = this.props;
    const { store } = this.context;
    const state = store.getState();
    // ...
  }
}

VisibleTodoList.contextTypes = {
  store: React.PropTypes.object
}
```



## React-Router路由库

使用`React-Router`的项目，与其它项目没有什么不同，也是使用`Provider`在`Router`外面包一层，毕竟`Provider`的唯一功能就是传入`store`对象。

```jsx
const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>
);
```













































