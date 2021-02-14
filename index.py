#!/usr/bin/python3

from airium import Airium
import numpy as np
import sys, os
import glob


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
            a.link(rel="stylesheet", href="index.css")
            a.script(type="text/javascript", src="index.js")

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
