/**
 * Break Out Space TinyMCE plugin. When you press CTRL+Enter in a custom tag you will get an empty paragraph outside the tag
 *
 * @author Peter Keung
 * @copyright Copyright 2014, Mugo Web
 * @author Mickael Fradin
 */

// Register plugin
tinymce.PluginManager.add( 'breakoutspace', function( ed, url )
{
    ed.on('keydown', function( e )
    {
        console.log(e);
        // Capture CTRL+Enter
        if( ( ( e.keyCode == 13 ) || ( e.keyCode == 10 ) ) && ( e.ctrlKey == true ) )
        {
            var dom = ed.dom;

            var parents = dom.getParents( ed.selection.getNode() );
            for( var i=0; i < parents.length; i++ )
            {
                currentNode = parents[i];
                // Insert empty paragraph at the end of the parent of the closest custom tag
                if( currentNode.nodeName == 'DIV' )
                {
                    // dom.insertAfter doesn't work reliably
                    var uniqueID = dom.uniqueId();
                    jQuery( '<p id="' + uniqueID + '">New emtpy line<br /></p>' ).insertAfter( currentNode );

                    // Move to the new node
                    var newParagraph = dom.select( 'p#' + uniqueID )[0];
                    ed.selection.setCursorLocation( newParagraph );

                    // Don't create an extra paragraph
                    e.defaultPrevented = true;
                    break;
                }
            }
        }
    });
} );
