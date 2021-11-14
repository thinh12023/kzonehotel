import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Loading } from "site/admin/components/admin";
import Loadable from "react-loadable";
import { Switch } from "react-router-dom";
import RouterWithPaths from "components/RouterWithPaths";
function Page(props) {
  const routers = [
    {
      roles: [],
      role: "",
      path: ["/", "/home"],
      component: Loadable({
        loader: () => import("site/user/containers/trang-chu"),
        loading: Loading,
      }),
    },
    {
      roles: [],
      role: "",
      path: "/loai-phong",
      component: Loadable({
        loader: () => import("site/user/containers/loai-phong"),
        loading: Loading,
      }),
    },
    {
      roles: [],
      role: "",
      path: "/dich-vu-tt",
      component: Loadable({
        loader: () => import("site/user/containers/dich-vu-tt"),
        loading: Loading,
      }),
    },
    {
      roles: [],
      role: "",
      path: "/dat-phong",
      component: Loadable({
        loader: () => import("site/user/containers/dat-phong"),
        loading: Loading,
      }),
    },
    {
      roles: [],
      role: "",
      path: "/loai-phong/:id",
      component: Loadable({
        loader: () => import("site/user/containers/loai-phong/chi-tiet"),
        loading: Loading,
      }),
    },
    {
      roles: [],
      role: "",
      path: "/lien-he",
      component: Loadable({
        loader: () => import("site/user/containers/lien-he"),
        loading: Loading,
      }),
    },
    {
      roles: [],
      role: "",
      path: "/thu-vien-anh",
      component: Loadable({
        loader: () => import("site/user/containers/thu-vien-anh"),
        loading: Loading,
      }),
    },
    {
      roles: [],
      role: "",
      path: "/tin-tuc",
      component: Loadable({
        loader: () => import("site/user/containers/tin-tuc"),
        loading: Loading,
      }),
    },
    {
      roles: [],
      role: "",
      path: "/tin-noi-bo",
      component: Loadable({
        loader: () => import("site/user/containers/tin-noi-bo"),
        loading: Loading,
      }),
    },
    {
      roles: [],
      role: "",
      path: "/tin-noi-bo/:id",
      component: Loadable({
        loader: () => import("site/user/containers/tin-noi-bo/chi-tiet"),
        loading: Loading,
      }),
    },
    {
      roles: [],
      role: "",
      path: "/vi-tri",
      component: Loadable({
        loader: () => import("site/user/containers/vi-tri"),
        loading: Loading,
      }),
    },
  ];
  return (
    <Main>
      <Header />
      <div className="body">
        <Switch>
          {routers.map((route, key) => {
            return (
              <RouterWithPaths
                exact
                key={key}
                roles={route.roles}
                path={route.path}
                render={(props) => {
                  return <route.component {...props} />;
                }}
              />
            );
          })}
        </Switch>
      </div>
      <Footer />
    </Main>
  )
}

export default connect()(Page);