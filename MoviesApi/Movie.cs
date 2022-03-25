namespace MoviesApi
{
    public class Movie
    {
        public int? id { get; set; }
        public String? title { get; set; }
        public double? imdbRating { get; set; }

        [System.ComponentModel.DataAnnotations.Schema.Column("date_notification")]
        public DateTime? dateNotification { get; set; }
        
    }
}