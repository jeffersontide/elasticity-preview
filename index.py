#!/usr/bin/python3

from airium import Airium
import numpy as np
import sys, os
import glob


def CSS_STRING():
    return '''body {
    text-align: center;
    font-family: Monaco, Courier New, sans-serif;
}

h3 {
    text-align: left;
}

table {
    border: 1px solid black;
}

th, td {
    border: 1px solid black;
}

td {
    width: 150px;
}

/* Style the Image Used to Trigger the Modal */
#myImg {
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

#myImg:hover {opacity: 0.7;}

/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.9); /* Black w/ opacity */
}

/* Modal Content (Image) */
.modal-content {
  margin: auto;
  display: block;
  width: 80%;
  max-width: 700px;
}

/* Caption of Modal Image (Image Text) - Same Width as the Image */
#caption {
    position: absolute;
    top: 0;
    background: rgb(0, 0, 0);
    background: rgba(0, 0, 0, 0.5); /* Black see-through */
    color: #f1f1f1;
    width: 80%;
    max-width:700px;
    transition: .5s ease;
    opacity:1;
    color: white;
    font-size: 20px;
    padding: 20px;
    text-align: center;
}

/* Add Animation - Zoom in the Modal */
.modal-content, #caption {
  animation-name: zoom;
  animation-duration: 0.2s;
}

@keyframes zoom {
  from {transform:scale(0)}
  to {transform:scale(1)}
}

/* The Close Button */
.close {
  position: absolute;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
}

.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}

/* 100% Image Width on Smaller Screens */
@media only screen and (max-width: 700px){
  .modal-content {
    width: 100%;
  }
}
'''


if __name__ == "__main__":
    rows = [0.01, 0.02, 0.05, 0.10]
    cols = [0.0, 0.001, 0.002, 0.01]

    traces = [["k0.01_g0.00.html", "k0.010_g0.001.html", "k0.010_g0.002.html", "k0.01_g0.01.html"],
              ["k0.02_g0.00.html", "k0.020_g0.001.html", "k0.020_g0.002.html", "k0.02_g0.01.html"],
              ["k0.05_g0.00.html", "k0.050_g0.001.html", "k0.050_g0.002.html", "k0.05_g0.01.html"],
              ["k0.10_g0.00.html", "k0.100_g0.001.html", "k0.100_g0.002.html", "k0.10_g0.01.html"]]

    a = Airium()
    a('<!DOCTYPE html>')

    with a.html(lang="en"):
        with a.head():
            a.meta(charset="utf-8")
            a.title(_t="Index")
            a.style(_t=CSS_STRING())
            # a.script(type="text/javascript", src="index.js")

        with a.body():
            a.h2(_t="Index")

            with a.table(id='table_372'):
                with a.tr():
                    pivot_str = "k \\ g"
                    a.td(_t=pivot_str)
                    for y in cols:
                        column_label = "{:3}".format(y)
                        a.td(_t=column_label)

                for i, x in enumerate(rows):
                    with a.tr():
                        a.td(_t=x)
                        for j, y in enumerate(cols):
                            with a.td():
                                t = traces[i][j]
                                link = "tables/" + t
                                a.a(href=link, _t="link")

    with open('index.html', "w+") as f:
        f.write(str(a))
