<div class="row" id="table-data">
    <div class="col-md-10">
        <div class="row">
            <div class="col-md-12 font-12 bold">
                <div class="container-show">
                    <p class="left-content poppins">Show</p>
                    <select class="right-content form-control poppins font-12" id="itemPage">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <!-- Add more options as needed -->
                    </select>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-2 pull-right">
        <div class="row">
            <div class="col-md-12">
                <input type="search" class="form-control poppins" id="search" />
            </div>

        </div>
    </div>
    <div class="col-md-12">
        <table class="table table-bordered poppins font-12">
            <thead>
                <tr class="text-center">
                    <th>No</th>
                    <th>Kategori</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                <tr ng-repeat="row in kategori" class="text-center">
                    <td>@{{ $index + 1 }}</td>
                    <td>@{{ row.name }}</td>
                    
                </tr>
            </tbody>
        </table>
        <div class="pagination">
            <button class="arrow" id="prevPage" disabled><span class="nav-text">PREV</span></button>
            <div class="pages">
            </div>
            <button class="arrow" id="nextPage"><span class="nav-text">NEXT</span></button>
        </div>
    </div>
</div>
