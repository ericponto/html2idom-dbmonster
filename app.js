import {patchHTML} from "html2idom";
import getDatabases from "./data";
import escapeHTML from "escape-html";

function renderTable(dbs) {
	return (
		`<table class="table table-striped latest-data">
			<tbody>
				${dbs.map(renderRow).join("")}
			</tbody>
		</table>`
	);
}

function renderRow(db) {
	return (
		`<tr>
			<td class="dbname">
				${db.name}
			</td>
			<td class="query-count">
				<span class="${db.countClassName}">
					${db.queries.length}
				</span>
			</td>
			${db.topFiveQueries.map(renderCols).join("")}
		</tr>`
	);
}

function renderCols(query) {
	return (
		`<td class="Query ${query.className}">
			${query.elapsed}
			<div class="popover left">
				<div class="popover-content">${escapeHTML(query.query)}</div>
				<div class="arrow"></div>
			</div>
		</td>`
	);
}

var body = document.getElementById('body');

function redraw() {
	var dbs = getDatabases(100);
	
	// update DOM
	patchHTML(body, renderTable(dbs));
	
	// redraw as soon as possible
	setTimeout(redraw, 0);
}

// start
redraw();

